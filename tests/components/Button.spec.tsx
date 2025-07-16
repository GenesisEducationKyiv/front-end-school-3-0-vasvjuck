import { test, expect } from '@playwright/experimental-ct-react';
import { Button } from '@/components/ui/button';
import { CtTestsWrapper } from './TestWrapper';

test.describe('Button component', () => {
    test('renders with text content', async ({ mount }) => {
        const component = await mount(
            <CtTestsWrapper>
                <Button>Click me</Button>
            </CtTestsWrapper>
        );

        await expect(component.getByText('Click me')).toBeVisible();
    });

    test('applies variant classes', async ({ mount }) => {
        const component = await mount(
            <CtTestsWrapper>
                <Button variant="destructive">Delete</Button>
            </CtTestsWrapper>
        );

        const button = component.getByText('Delete');
        await expect(button).toHaveClass(/destructive/);
    });

    test('handles click events', async ({ mount }) => {
        let clicked = false;
        const handleClick = () => {
            clicked = true;
        };

        const component = await mount(
            <CtTestsWrapper>
                <Button onClick={handleClick}>Click me</Button>
            </CtTestsWrapper>
        );

        await component.getByText('Click me').click();
        expect(clicked).toBe(true);
    });

    test('can be disabled', async ({ mount }) => {
        const component = await mount(
            <CtTestsWrapper>
                <Button disabled>Disabled Button</Button>
            </CtTestsWrapper>
        );

        const button = component.getByText('Disabled Button');
        await expect(button).toBeDisabled();
    });
}); 