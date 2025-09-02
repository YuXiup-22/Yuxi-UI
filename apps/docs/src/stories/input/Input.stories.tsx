import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '@yuxi-ui/input';
import { useRef } from 'react';
import { Button } from '@yuxi-ui/button';
import { expect, userEvent, within } from '@storybook/test';
const meta = {
  component: Input,
  title: 'Input',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {},
} satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;
const RefForwardingDemo = () => {
  const ref = useRef<HTMLInputElement | null>(null);
  const handleClick = () => {
    ref.current?.focus();
  };
  return (
    <>
      <Input ref={ref} placeholder="这是一个输入框"></Input>
      <Button style={{ marginTop: '16px' }} onClick={handleClick}>
        点击Focus输入框
      </Button>
    </>
  );
};
export const TestRefForwarding: Story = {
  args: {},
  render: () => <RefForwardingDemo></RefForwardingDemo>,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const ButtonDom = canvas.getByRole('button', {
      name: '点击Focus输入框',
    });
    const InputDom = canvas.getByPlaceholderText('这是一个输入框');
    await step('判断初始时未focus', async () => {
      await expect(InputDom).not.toHaveFocus();
    });
    await step('点击按钮', async () => {
      await userEvent.click(ButtonDom);
    });
    await step('点击后为focus', async () => {
      await expect(InputDom).toHaveFocus();
    });
  },
};
