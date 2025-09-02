import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '@yuxi-ui/input';

const meta = {
  component: Input,
  title: 'Input',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {},
} satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;
export const BaseInput: Story = {
  args: {},
};
