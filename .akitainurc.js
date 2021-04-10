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
      process.env.AKITAINU_BEFORE_REF && process.env.AKITAINU_AFTER_REF ? [
        {
          source: [
            "akitainu:git-diff-source",
            {
              before: process.env.AKITAINU_BEFORE_REF,
              after: process.env.AKITAINU_AFTER_REF
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