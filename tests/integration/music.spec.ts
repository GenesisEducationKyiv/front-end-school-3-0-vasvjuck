import { test, expect, type Page } from '@playwright/test';

const mockTrack = {
    id: 'track-123',
    title: 'Original Title',
    artist: 'Original Artist',
    album: 'Original Album',
    genres: ['Rock'],
    coverImage: '',
    audioFile: null,
};

async function mockListTracks(page: Page, data = [mockTrack], status = 200) {
    await page.route('**/api/tracks**', (route) => {
        return route.fulfill({
            status,
            contentType: 'application/json',
            body: JSON.stringify({ data, meta: { totalPages: 1 } }),
        });
    });

    await page.route('**/api/genres**', (route) => {
        return route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(['Rock', 'Pop']),
        });
    });
}

test.describe('MusicPage integration', () => {
    test('renders tracks from API and allows selecting one', async ({ page }) => {
        await mockListTracks(page);
        await page.goto('http://localhost:3000');

        const trackTitle = page.getByTestId('track-item-track-123-title');
        await expect(trackTitle).toBeVisible();
        await expect(trackTitle).toHaveText('Original Title');

        const checkbox = page.getByTestId('track-checkbox-{track-123}');
        await checkbox.check();
        await expect(checkbox).toBeChecked();
    });

    test('renders empty state if no tracks found', async ({ page }) => {
        await mockListTracks(page, []);
        await page.goto('http://localhost:3000');

        const emptyState = page.getByText(/no tracks found/i);
        await expect(emptyState).toBeVisible();
    });

    test('shows loading skeletons before data loads', async ({ page }) => {
        await page.route('**/api/tracks**', async (route) => {
            await new Promise((res) => setTimeout(res, 500));
            return route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ data: [mockTrack], meta: { totalPages: 1 } }),
            });
        });

        await page.route('**/api/genres**', (route) => {
            return route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(['Rock', 'Pop']),
            });
        });

        await page.goto('http://localhost:3000');

        const skeleton = page.getByTestId('loading-tracks');
        await expect(skeleton).toBeVisible();

        const track = page.getByTestId('track-item-track-123');
        await expect(track).toBeVisible();
    });
});
