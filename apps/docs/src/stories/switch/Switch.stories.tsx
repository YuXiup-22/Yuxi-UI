import { Switch } from '../../../../../packages/switch/src';
import { fn, within, userEvent, expect } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
const ActionsData = {
  onChange: fn(),
};
const meta = {
  component: Switch,
  title: 'Switch',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {
    ...ActionsData,
  },
} satisfies Meta<typeof Switch>;
export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 非受控模式测试自动化测试play
 * 思路：验证组件 自治性
 * 方法：使用fn监控onChange函数，在play中模拟点击，expect断言UI状态和onChange调用情况
 * 成功指标：
 * 1.初始化UI状态和defaultValue匹配
 * 2.UI更新，点击后aria-checked状态正确
 * 3.onChange被调用，返回正确的内部状态
 */
export const Uncontrolled: Story = {
  args: {
    defaultValue: true,
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const switchCanvas = await canvas.findByRole('switch');
    await step('setup:重置onChange mock状态', () => {
      args.onChange?.mockClear();
    });
    await step('1.验证初始状态:true', async () => {
      await expect(switchCanvas).toBeChecked();
    });
    await step('2.测试第一次交互，点击切换为false', async () => {
      await userEvent.click(switchCanvas);
      await expect(switchCanvas).not.toBeChecked();
      // await expect(args.onChange).toHaveBeenCalled();
      await expect(args.onChange).toHaveBeenCalledTimes(1);
      await expect(args.onChange).toHaveBeenCalledWith(false);
    });
    await step('3.测试第二次交互，点击切换为true', async () => {
      await userEvent.click(switchCanvas);
      await expect(switchCanvas).toBeChecked();
      await expect(args.onChange).toHaveBeenCalledTimes(2);
      await expect(args.onChange).toHaveBeenCalledWith(true);
    });
  },
};
/**
 * 受控模式测试用例：
 * 思路：验证组件 服从性
 * 方法：render函数中模拟父组件完全控制check,play函数模拟用户交互和外部命令，
 * expect断言是否始终服从
 * 成功指标：
 * 1.渲染服从性：UI渲染总是和外部命令匹配
 * 2.只汇报不行动：点击后状态不改变，
 * 3.正确汇报意图：onChange被调用，返回期望的状态
 * 4.服从外部命令：没有点击，外部改变立即UI渲染
 */
export const Controlled: Story = {
  render: function ControlledTest(args) {
    const [isChecked, setChecked] = useState(true);
    const handleChange = (checked: boolean) => {
      setChecked(checked);
      // 调用fn,使得play可以断言，因为这里用我们自定义handle作为参数，fn需要主动调用
      args.onChange?.(checked);
    };
    return (
      <>
        <Switch value={isChecked} onChange={handleChange}></Switch>
        <br></br>
        <br></br>
        <br></br>
        <button onClick={() => setChecked(!isChecked)}>
          父组件强制切换状态
        </button>
      </>
    );
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const switchControl = await canvas.findByRole('switch');
    const parentButton = await canvas.findByRole('button', {
      name: '父组件强制切换状态',
    });
    await step('setup:onchange mock重置', () => {
      args.onChange?.mockClear();
    });
    await step('1.验证初始化UI渲染状态:true', async () => {
      await expect(switchControl).toBeChecked();
    });
    await step('2.第一次点击交互，验证是否正确汇报状态:false', async () => {
      await userEvent.click(switchControl);
      await expect(switchControl).not.toBeChecked();
      await expect(args.onChange).toHaveBeenCalledTimes(1);
      await expect(args.onChange).toHaveBeenCalledWith(false);
    });
    await step('3.第二次点击交互，验证是否正确汇报状态:true', async () => {
      await userEvent.click(switchControl);
      await expect(switchControl).toBeChecked();
      await expect(args.onChange).toHaveBeenCalledTimes(2);
      await expect(args.onChange).toHaveBeenCalledWith(true);
    });
    await step('4.验证组件是否服从外部命令，状态为：false', async () => {
      args.onChange?.mockClear();
      await userEvent.click(parentButton);
      await expect(switchControl).not.toBeChecked();
      await expect(args.onChange).not.toHaveBeenCalled();
    });
  },
};
/**
 * 验证是否是提线木偶，只传递状态，不改变状态
 * 成功指标：
 * 1.初始状态能够正确反应
 * 2.点击后，能够汇报正确状态
 * 3.点击后，父组件没有更新，所以状态不变
 */
export const ControlledIsAPurePuppet: Story = {
  render: function ControlledIsAPurePuppet(args) {
    const [isChecked] = useState(true);
    const handleChange = (checked: boolean) => {
      // 调用fn,使得play可以断言，因为这里用我们自定义handle作为参数，fn需要主动调用
      args.onChange?.(checked);
    };
    return (
      <>
        <p>
          这个父组件的状态是 <strong>{isChecked.toString()}</strong>
        </p>
        <p>
          这个 Switch 的 onChange 处理器被故意“弄坏”了，它不会更新父组件的状态。
        </p>
        <Switch value={isChecked} onChange={handleChange}></Switch>
      </>
    );
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const switchControl = await canvas.findByRole('switch');

    await step('setup：验证初始状态为：true', async () => {
      await expect(switchControl).toBeChecked();
    });
    await step('点击后，onChange正确汇报状态，同时UI状态不变', async () => {
      args.onChange?.mockClear();
      await userEvent.click(switchControl);

      expect(args.onChange).toHaveBeenCalledTimes(1);
      expect(args.onChange).toHaveBeenCalledWith(false);

      expect(switchControl).toBeChecked();
    });
  },
};
/**
 * 受控转非受控的边缘测试
 * 验证 "控制权"交接时，状态的可预测性
 * 测试思路：一开始为受控模式且状态和defaultValue不一致，通过rerender或者
 * 更新value进行控制权交接，交接后瞬间UI状态验证，交接后是否能够“自理”
 */
export const ControlToUncontrolledTransition: Story = {
  args: {
    defaultValue: false,
  },
  render: function ControlToUncontrolledTransition(args) {
    const [isControlled, setIsControlled] = useState(true);
    // 受控模式下，我们故意将其设置为与 defaultValue 相反的状态
    const [parentChecked] = useState(true);
    const switchProps: { value?: boolean } = {};
    if (isControlled) {
      switchProps.value = parentChecked;
    }
    return (
      <div>
        <fieldset>
          <legend>测试控制器</legend>
          <button onClick={() => setIsControlled(false)}>
            切换为非受控模式 (执行交接)
          </button>
          <p>
            当前模式:{' '}
            {isControlled ? `受控 (值为: ${parentChecked})` : '非受控'}
          </p>
        </fieldset>
        <hr />
        <Switch {...args} {...switchProps} onChange={args.onChange} />
      </div>
    );
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const switchControl = await canvas.findByRole('switch');
    const handoverButton = await canvas.findByRole('button', {
      name: /执行交接/i,
    });
    await step('Step 1: 验证初始受控状态 (应为 On)', async () => {
      // 初始 `checked` prop 是 true
      await expect(switchControl).toBeChecked();
    });
    await step('Step 2: 执行控制权交接 (切换为非受控)', async () => {
      await userEvent.click(handoverButton);
    });
    await step('Step 3: 验证指标 1 - 交接后的瞬时状态', async () => {
      // 在这里，你需要根据你的 useMergedState 实现来选择一个断言

      // 选项 A: 如果你的实现是“状态重置 (Reset)”
      console.log('正在验证“状态重置”策略...');
      await expect(switchControl).not.toBeChecked(); // 应回退到 defaultChecked={false}
    });
    await step('Step 4: 验证指标 2 - 交接后恢复自治', async () => {
      args.onChange?.mockClear();
      // 假设是“重置”策略，当前状态为 false
      await userEvent.click(switchControl);

      // UI 应该能自我更新
      await expect(switchControl).toBeChecked();
      // onChange 应该汇报其新的内部状态
      await expect(args.onChange).toHaveBeenCalledWith(true);
    });
  },
};
