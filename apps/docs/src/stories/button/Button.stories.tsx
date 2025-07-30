import type { Meta, StoryObj } from '@storybook/react-vite';

// import { fn } from '@storybook/test';

import { Button } from '../../../../../packages/button/src';

const meta = {
  component: Button,
  title: 'Button',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {},
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'default',
    children: 'Default Button',
  },
};
export const Primary: Story = {
  args: {
    type: 'primary',
    children: 'Primary Button',
    size: 'large',
  },
};
export const Dashed: Story = {
  args: {
    type: 'dashed',
    children: 'Dashed Button',
  },
};
export const Link: Story = {
  args: {
    type: 'link',
    children: 'Link Button',
  },
};
export const Text: Story = {
  args: {
    type: 'text',
    children: 'Text Button',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'large',
  },
};
export const Middle: Story = {
  args: {
    children: 'Middle Button',
    size: 'middle',
  },
};
export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'small',
  },
};
