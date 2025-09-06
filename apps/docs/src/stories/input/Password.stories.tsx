import { Input } from '@yuxi-ui/input';
import type { Meta, StoryObj } from '@storybook/react-vite';
const meta = {
  component: Input.Password,
  title: 'Password',
  tags: ['autodocs'],
  args: {},
  excludeStories: /.*Data$/,
} satisfies Meta<typeof Input.Password>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {},
};
