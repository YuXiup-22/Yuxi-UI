export default {
  extends: ['@commitlint/config-conventional'], // 继承 Conventional Commits 规范
  // 你可以在这里添加自定义规则，例如：
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // bug 修复
        'docs', // 文档
        'style', // 代码格式 (不影响代码运行的变动)
        'refactor', // 重构 (既不是新增功能，也不是修改bug的代码变动)
        'perf', // 性能优化
        'test', // 测试
        'build', // 构建过程或辅助工具的变动
        'ci', // CI 配置，脚本文件
        'revert', // 回滚
        'chore', // 其他不修改 src 或 test 文件的提交
      ],
    ],
    'scope-enum': [
      2,
      'always',
      ['button', 'input', 'docs', 'deps', 'release', '*'], // 允许的 scope，* 表示任意
    ],
    'subject-full-stop': [0, 'never'], // 标题结尾不能有标点符号
    'subject-case': [0, 'never'], // 标题大小写不校验
    'header-max-length': [2, 'always', 100], // header 最大长度
  },
};
