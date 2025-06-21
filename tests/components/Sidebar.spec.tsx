import { test, expect } from '@playwright/experimental-ct-react';
import { Sidebar } from '@/components/app/Sidebar';

test.describe('Sidebar component', () => {
    test('renders with default classes and buttons', async ({ mount }) => {
        const component = await mount(<Sidebar />);

        await expect(component.getByTestId('tracks-header')).toHaveText('Musicvvv');
        await expect(component.getByText('Listen Now')).toBeVisible();
        await expect(component.getByText('Radio')).toBeDisabled();
    });
});
