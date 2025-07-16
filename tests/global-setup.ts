import { chromium } from '@playwright/test';
import type { FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
    const baseURL = config.projects[0]?.use?.baseURL || 'http://localhost:3000';

    const browser = await chromium.launch();
    const page = await browser.newPage();

    try {
        await page.goto(baseURL);
        await page.waitForLoadState('networkidle');

        console.log('✅ Global setup completed - application is ready for testing');
    } catch (error) {
        console.error('❌ Global setup failed:', error);
        throw error;
    } finally {
        await browser.close();
    }
}

export default globalSetup; 