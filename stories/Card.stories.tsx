import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';

const meta: Meta<typeof Card> = {
    title: 'UI/Card',
    component: Card,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A flexible card component with header, content, and footer sections.'
            }
        }
    },
};
export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
    render: () => (
        <Card style={{ maxWidth: 400 }}>
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>This is a description for the card.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Card content goes here. You can put any React node here.</p>
            </CardContent>
            <CardFooter>
                <button>Action</button>
            </CardFooter>
        </Card>
    ),
    name: 'Default Card',
    parameters: {
        docs: {
            description: {
                story: 'A basic card with header, content, and footer.'
            }
        }
    }
}; 