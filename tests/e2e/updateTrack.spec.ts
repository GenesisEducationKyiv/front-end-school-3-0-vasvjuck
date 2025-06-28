import { test, expect } from '@playwright/test';

test.describe('Edit Track E2E', () => {
    const mockTrack = {
        id: 'track-123',
        title: 'Original Title',
        artist: 'Original Artist',
        album: 'Original Album',
        genres: ['Rock'],
        coverImage: '',
        audioFile: null,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
    };

    test.beforeEach(async ({ page }) => {
        await page.route('**/api/genres**', route =>
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(['Rock', 'Pop', 'Jazz']),
            })
        );

        await page.route('**/api/tracks**', route =>
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    data: [mockTrack],
                    meta: { totalPages: 1, total: 1, page: 1, limit: 8 }
                }),
            })
        );

        await page.goto('http://localhost:3000/tracks');
        await page.waitForLoadState('networkidle');
    });

    test('should open edit dialog and show form', async ({ page }) => {
        await expect(page.getByTestId(`track-item-${mockTrack.id}`)).toBeVisible();
        await page.getByTestId(`edit-track-${mockTrack.id}`).click();
        await expect(page.getByTestId('track-form')).toBeVisible();
        await expect(page.getByTestId('input-title')).toHaveValue(mockTrack.title);
        await expect(page.getByTestId('input-artist')).toHaveValue(mockTrack.artist);
        await expect(page.getByTestId('input-album')).toHaveValue(mockTrack.album);
    });

    test('should close dialog when clicking outside', async ({ page }) => {
        await expect(page.getByTestId(`track-item-${mockTrack.id}`)).toBeVisible();
        await page.getByTestId(`edit-track-${mockTrack.id}`).click();
        await expect(page.getByTestId('track-form')).toBeVisible();
        await page.click('body', { position: { x: 0, y: 0 } });
        await expect(page.getByTestId('track-form')).not.toBeVisible();
    });

    test('should display genre selector with available genres', async ({ page }) => {
        await expect(page.getByTestId(`track-item-${mockTrack.id}`)).toBeVisible();
        await page.getByTestId(`edit-track-${mockTrack.id}`).click();
        await page.getByTestId('genre-selector').click();
        await expect(page.getByRole('option', { name: 'Pop' })).toBeVisible();
        await expect(page.getByRole('option', { name: 'Jazz' })).toBeVisible();
    });

    test('should show cover image preview', async ({ page }) => {
        await expect(page.getByTestId(`track-item-${mockTrack.id}`)).toBeVisible();
        await page.getByTestId(`edit-track-${mockTrack.id}`).click();
        await expect(page.getByTestId('input-cover-image')).toBeVisible();
        await expect(page.locator('img[alt="Cover preview"]')).toBeVisible();
    });

    test('should allow editing track metadata', async ({ page }) => {
        await expect(page.getByTestId(`track-item-${mockTrack.id}`)).toBeVisible();
        await page.getByTestId(`edit-track-${mockTrack.id}`).click();
        await expect(page.getByTestId('input-title')).toBeVisible();
        await expect(page.getByTestId('input-artist')).toBeVisible();
        await expect(page.getByTestId('input-album')).toBeVisible();
        await expect(page.getByTestId('input-cover-image')).toBeVisible();
        await expect(page.getByTestId('genre-selector')).toBeVisible();
        await expect(page.getByTestId('submit-button')).toBeVisible();
        await expect(page.getByTestId('submit-button')).toHaveText('Save changes');
    });

    test('should allow filling form fields', async ({ page }) => {
        await expect(page.getByTestId(`track-item-${mockTrack.id}`)).toBeVisible();
        await page.getByTestId(`edit-track-${mockTrack.id}`).click();
        await page.getByTestId('input-title').fill('New Title');
        await page.getByTestId('input-artist').fill('New Artist');
        await page.getByTestId('input-album').fill('New Album');
        await page.getByTestId('input-cover-image').fill('https://example.com/image.jpg');
        await expect(page.getByTestId('input-title')).toHaveValue('New Title');
        await expect(page.getByTestId('input-artist')).toHaveValue('New Artist');
        await expect(page.getByTestId('input-album')).toHaveValue('New Album');
        await expect(page.getByTestId('input-cover-image')).toHaveValue('https://example.com/image.jpg');
    });
});
