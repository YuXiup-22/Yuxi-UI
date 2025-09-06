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
export const BaseInputStyle: Story = {
  args: {
    disabled: false,
    placeholder: 'input基础样式',
    prefix: (
      <svg
        viewBox="64 64 896 896"
        focusable="false"
        data-icon="sync"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M168 504.2c1-43.7 10-86.1 26.9-126 17.3-41 42.1-77.7 73.7-109.4S337 212.3 378 195c42.4-17.9 87.4-27 133.9-27s91.5 9.1 133.8 27A341.5 341.5 0 01755 268.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 003 14.1l175.7 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c0-6.7-7.7-10.5-12.9-6.3l-56.4 44.1C765.8 155.1 646.2 92 511.8 92 282.7 92 96.3 275.6 92 503.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8zm756 7.8h-60c-4.4 0-7.9 3.5-8 7.8-1 43.7-10 86.1-26.9 126-17.3 41-42.1 77.8-73.7 109.4A342.45 342.45 0 01512.1 856a342.24 342.24 0 01-243.2-100.8c-9.9-9.9-19.2-20.4-27.8-31.4l60.2-47a8 8 0 00-3-14.1l-175.7-43c-5-1.2-9.9 2.6-9.9 7.7l-.7 181c0 6.7 7.7 10.5 12.9 6.3l56.4-44.1C258.2 868.9 377.8 932 512.2 932c229.2 0 415.5-183.7 419.8-411.8a8 8 0 00-8-8.2z"></path>
      </svg>
    ),
    allowClear: true,
    suffix: (
      <svg
        viewBox="64 64 896 896"
        focusable="false"
        data-icon="sync"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M168 504.2c1-43.7 10-86.1 26.9-126 17.3-41 42.1-77.7 73.7-109.4S337 212.3 378 195c42.4-17.9 87.4-27 133.9-27s91.5 9.1 133.8 27A341.5 341.5 0 01755 268.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 003 14.1l175.7 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c0-6.7-7.7-10.5-12.9-6.3l-56.4 44.1C765.8 155.1 646.2 92 511.8 92 282.7 92 96.3 275.6 92 503.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8zm756 7.8h-60c-4.4 0-7.9 3.5-8 7.8-1 43.7-10 86.1-26.9 126-17.3 41-42.1 77.8-73.7 109.4A342.45 342.45 0 01512.1 856a342.24 342.24 0 01-243.2-100.8c-9.9-9.9-19.2-20.4-27.8-31.4l60.2-47a8 8 0 00-3-14.1l-175.7-43c-5-1.2-9.9 2.6-9.9 7.7l-.7 181c0 6.7 7.7 10.5 12.9 6.3l56.4-44.1C258.2 868.9 377.8 932 512.2 932c229.2 0 415.5-183.7 419.8-411.8a8 8 0 00-8-8.2z"></path>
      </svg>
    ),
  },
};
