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
      process.env.GITHUB_BASE_REF && process.env.GITHUB_HEAD_REF ? [
        {
          source: [
            "akitainu:git-diff-source",
            {
              before: process.env.GITHUB_BASE_REF,
              after: "HEAD"
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