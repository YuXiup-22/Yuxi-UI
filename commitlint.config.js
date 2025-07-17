module.exports = {
  extends: ["@commitlint/config-conventional"], // 继承 Conventional Commits 规范
  // 你可以在这里添加自定义规则，例如：
  rules: {
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "docs", "style", "refactor", "test", "revert", "chore"],
    ],
    "scope-enum": [
      2,
      "always",
      ["button", "input", "docs", "deps", "release", "*"], // 允许的 scope，* 表示任意
    ],
  },
};
