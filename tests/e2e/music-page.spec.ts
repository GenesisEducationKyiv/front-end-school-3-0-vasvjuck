import { test, expect } from '@playwright/test';

test.describe('MusicPage e2e', () => {
    const mockTracks = [
        {
            id: '1',
            title: 'Test Song 1',
            artist: 'Test Artist 1',
            album: 'Test Album 1',
            genres: ['Rock'],
            coverImage: '',
            audioFile: null,
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z'
        },
        {
            id: '2',
            title: 'Test Song 2',
            artist: 'Test Artist 2',
            album: 'Test Album 2',
            genres: ['Jazz'],
            coverImage: '',
            audioFile: null,
            createdAt: '2024-01-02T00:00:00Z',
            updatedAt: '2024-01-02T00:00:00Z'
        }
    ];

    test.beforeEach(async ({ page }) => {
        await page.route('**/api/genres**', route =>
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(['Rock', 'Jazz', 'Pop']),
            })
        );

        await page.route('**/api/tracks**', route =>
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    data: mockTracks,
                    meta: { totalPages: 2, total: 2, page: 1, limit: 8 }
                }),
            })
        );

        await page.goto('http://localhost:3000/tracks');
        await page.waitForLoadState('networkidle');
    });

    test('should load the music page and display tracks', async ({ page }) => {
        await expect(page.getByRole('tab', { name: 'Music' })).toBeVisible();

        await expect(page.getByText('Test Song 1')).toBeVisible();
        await expect(page.getByText('Test Artist 1')).toBeVisible();
        await expect(page.getByText('Test Song 2')).toBeVisible();
        await expect(page.getByText('Test Artist 2')).toBeVisible();
    });

    test('should show create track button', async ({ page }) => {
        await expect(page.getByRole('button', { name: /create/i })).toBeVisible();
    });

    test('should display search input', async ({ page }) => {
        await expect(page.getByTestId('search-input')).toBeVisible();
        await expect(page.getByTestId('search-input')).toHaveAttribute('placeholder', 'Search tracks...');
    });

    test('should display pagination controls', async ({ page }) => {
        await expect(page.getByTestId('pagination')).toBeVisible();

        await expect(page.getByTestId('pagination-prev')).toBeVisible();
        await expect(page.getByTestId('pagination-next')).toBeVisible();
    });

    test('should allow selecting tracks with checkboxes', async ({ page }) => {
        await expect(page.getByTestId('track-checkbox-{1}')).toBeVisible();
        await expect(page.getByTestId('track-checkbox-{2}')).toBeVisible();

        await page.getByTestId('track-checkbox-{1}').click();

        await expect(page.getByTestId('select-all')).toBeVisible();
        await expect(page.getByText('1 selected')).toBeVisible();
    });

    test('should allow selecting all tracks', async ({ page }) => {
        await page.getByTestId('track-checkbox-{1}').click();
        await page.getByTestId('track-checkbox-{2}').click();

        await expect(page.getByText('2 selected')).toBeVisible();

        await expect(page.getByTestId('select-all')).toBeChecked();
    });

    test('should show bulk delete button when tracks are selected', async ({ page }) => {
        await page.getByTestId('track-checkbox-{1}').click();

        await expect(page.getByTestId('bulk-delete-button')).toBeVisible();
        await expect(page.getByTestId('bulk-delete-button')).toContainText('Delete Selected (1)');
    });

    test('should show delete confirmation dialog', async ({ page }) => {
        await page.getByTestId('track-checkbox-{1}').click();

        await page.getByTestId('bulk-delete-button').click();

        await expect(page.getByTestId('confirm-dialog')).toBeVisible();
        await expect(page.getByText('Delete Tracks')).toBeVisible();
        await expect(page.getByText('Are you sure you want to delete 1 tracks?')).toBeVisible();

        await expect(page.getByTestId('cancel-delete')).toBeVisible();
        await expect(page.getByTestId('confirm-delete')).toBeVisible();
    });

    test('should display track cards with correct information', async ({ page }) => {
        await expect(page.getByTestId('track-item-1')).toBeVisible();
        await expect(page.getByTestId('track-item-2')).toBeVisible();

        await expect(page.getByTestId('track-item-1-title')).toHaveText('Test Song 1');
        await expect(page.getByTestId('track-item-1-artist')).toHaveText('Test Artist 1');
        await expect(page.getByTestId('track-item-2-title')).toHaveText('Test Song 2');
        await expect(page.getByTestId('track-item-2-artist')).toHaveText('Test Artist 2');
    });

    test('should show empty state when no tracks', async ({ page }) => {
        await page.route('**/api/tracks**', route =>
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    data: [],
                    meta: { totalPages: 1, total: 0, page: 1, limit: 8 }
                }),
            })
        );

        await page.reload();
        await page.waitForLoadState('networkidle');

        await expect(page.getByText('No Tracks Found')).toBeVisible();
        await expect(page.getByText("We couldn't find any tracks here")).toBeVisible();
    });
});
