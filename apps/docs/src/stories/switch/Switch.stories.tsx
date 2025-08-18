import { Switch } from '../../../../../packages/switch/src';
// import { fn, within, userEvent, expect } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  component: Switch,
  title: 'Switch',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {},
} satisfies Meta<typeof Switch>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '',
  },
};
