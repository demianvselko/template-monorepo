module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "hotfix",
        "test",
        "docs",
        "chore",
        "refactor",
        "style",
        "ci/cd",
        "performance",
        "infra",
      ],
    ],
  },
};
