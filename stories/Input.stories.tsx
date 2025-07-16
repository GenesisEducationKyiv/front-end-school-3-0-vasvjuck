import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Input } from '../components/ui/input';

const meta: Meta<typeof Input> = {
    title: 'UI/Input',
    component: Input,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A styled input component for forms.'
            }
        }
    },
    argTypes: {
        placeholder: { control: 'text' },
        type: { control: 'text' },
        disabled: { control: 'boolean' },
    },
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
    args: {
        placeholder: 'Enter text...',
        type: 'text',
    },
    parameters: {
        docs: {
            description: {
                story: 'A basic text input.'
            }
        }
    }
};

export const Password: Story = {
    args: {
        placeholder: 'Password',
        type: 'password',
    },
};

export const Disabled: Story = {
    args: {
        placeholder: 'Disabled input',
        disabled: true,
    },
}; 