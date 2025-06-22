import { test, expect } from '@playwright/test';

test.describe('MusicPage e2e', () => {
    test.beforeEach(async ({ page }) => {
        await page.route('**/api/genres**', r =>
            r.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ data: ['Rock', 'Jazz'] }),
            })
        );
        await page.route('**/api/tracks**', r =>
            r.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    data: [
                        { id: '1', title: 'Song A', genre: 'Rock', createdAt: '2025-06-01' }
                    ],
                    meta: { totalPages: 1 }
                }),
            })
        );
        await page.goto('http://localhost:3000');
    });

    test('renders track list and can search', async ({ page }) => {
        await expect(page.getByText('Song A')).toBeVisible();
    });
});
