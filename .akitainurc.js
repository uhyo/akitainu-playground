// eslint rules to check only for changed files in PRs
const eslintAdditionalCheckRules = ["@typescript-eslint/no-explicit-any"]

module.exports = {
  rules: [
    {
      source: [
        "akitainu:static-source",
        {
          files: [
            "./src/**/*.ts"
          ]
        }
      ],
      checker: "akitainu-checker-eslint",
      filter: [
        "akitainu:by-code-filter",
        {
          exclude: eslintAdditionalCheckRules
        }
      ]
    },
    ...(
      // additional check for pull request
      process.env.AKITAINU_BEFORE_SHA && process.env.AKITAINU_AFTER_SHA ? [
        {
          source: [
            "akitainu:git-diff-source",
            {
              before: process.env.AKITAINU_BEFORE_SHA,
              after: process.env.AKITAINU_AFTER_SHA
            }
          ],
          checker: "akitainu-checker-eslint",
          filter: [
            "akitainu:by-code-filter",
            {
              include: eslintAdditionalCheckRules
            }
          ]
        }
      ] : []
    )
  ]
}