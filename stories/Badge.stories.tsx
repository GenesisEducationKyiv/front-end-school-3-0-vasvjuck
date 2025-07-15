import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Badge } from '../components/ui/badge';

const meta: Meta<typeof Badge> = {
    title: 'UI/Badge',
    component: Badge,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A badge component for status or labeling.'
            }
        }
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'secondary', 'destructive', 'outline'],
        },
        children: { control: 'text' },
    },
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
    args: {
        children: 'Default',
        variant: 'default',
    },
    parameters: {
        docs: {
            description: {
                story: 'Default badge variant.'
            }
        }
    }
};

export const Secondary: Story = {
    args: {
        children: 'Secondary',
        variant: 'secondary',
    },
};

export const Destructive: Story = {
    args: {
        children: 'Destructive',
        variant: 'destructive',
    },
};

export const Outline: Story = {
    args: {
        children: 'Outline',
        variant: 'outline',
    },
}; 