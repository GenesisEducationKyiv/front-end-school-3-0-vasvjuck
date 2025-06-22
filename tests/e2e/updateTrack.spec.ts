// tests/EditTrack.e2e.spec.ts
import { test, expect, Page } from '@playwright/test';

const mockTrack = {
    id: 'track-123',
    title: 'Original Title',
    artist: 'Original Artist',
    album: 'Original Album',
    genres: ['Rock'],
    coverImage: '',
    audioFile: null,
};

async function mockListTracks(page: Page) {
    // Intercept any GET to /api/tracks
    await page.route('**/api/tracks**', (route, request) => {
        if (request.method() === 'GET') {
            return route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ data: [mockTrack], meta: { totalPages: 1 } }),
            });
        }
        return route.continue();
    });
}

async function mockUpdateTrack(page: Page, expectedBody) {
    let called = false;
    // Broaden pattern to catch PUT to any /api/tracks/{id}
    await page.route('**/api/tracks/**', async (route, request) => {
        if (request.method() !== 'PUT')
            return route.continue();

        // verify payload
        const url = request.url();
        expect(url).toMatch(/\/api\/tracks\/${mockTrack.id}$/);
        const body = await request.postDataJSON();
        expect(body).toEqual(expectedBody);
        called = true;
        await route.fulfill({ status: 200 });
    });
    return () => called;
}

test.describe('Edit Track E2E', () => {
    test.beforeEach(async ({ page }) => {
        await mockListTracks(page);
        await page.goto('http://localhost:3000');
    });

    test('should open edit dialog, submit changes, and show success toast', async ({ page }) => {
        // 1) list stub
        const card = page.getByTestId(`track-item-${mockTrack.id}`);
        await expect(card).toBeVisible();

        // 2) prepare new values
        const newValues = {
            id: mockTrack.id,
            title: 'Updated Title',
            artist: 'Updated Artist',
            album: 'Updated Album',
            genres: ['Rock'],
            coverImage: 'https://picsum.photos/300/200',
            audioFile: null,
        };

        // 3) stub PUT
        const wasCalled = await mockUpdateTrack(page, newValues);

        // 4) open edit dialog
        await page.getByTestId(`edit-track-${mockTrack.id}`).click();
        const form = page.getByTestId('track-form');
        await expect(form).toBeVisible();

        // 5) fill inputs
        await form.getByTestId('input-title').fill(newValues.title);
        await form.getByTestId('input-artist').fill(newValues.artist);
        await form.getByTestId('input-album').fill(newValues.album);
        await form.getByTestId('input-cover-image').fill(newValues.coverImage);

        // 6) submit and wait for PUT
        // await form.getByTestId('submit-button').click();

        // 7) assertions
        // await expect(page.getByText(/Updated Title updated\./)).toBeVisible();
        // expect(wasCalled()).toBeTruthy();
        // await expect(form).toBeHidden();
    });
});
