import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Checkbox } from '../components/ui/checkbox';

const meta: Meta<typeof Checkbox> = {
    title: 'UI/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A styled checkbox component.'
            }
        }
    },
    argTypes: {
        checked: { control: 'boolean' },
        disabled: { control: 'boolean' },
    },
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
    args: {
        checked: false,
    },
    parameters: {
        docs: {
            description: {
                story: 'A basic checkbox.'
            }
        }
    }
};

export const Checked: Story = {
    args: {
        checked: true,
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
}; 