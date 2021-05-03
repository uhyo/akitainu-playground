// eslint rules to check only for changed files in PRs
const eslintAdditionalCheckRules = ["@typescript-eslint/no-explicit-any"]

module.exports = {
  rules: [
    // default TypeScript configuration
    {
      checker: "akitainu-checker-typescript",
    },
    // default ESLint configuration
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
      process.env.GITHUB_BASE_REF ? [
        // stricter ESLint check for changed files
        {
          source: [
            "akitainu:git-diff-source",
            {
              before: "origin/" + process.env.GITHUB_BASE_REF,
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
        },
        // stricter TypeScript check for changed files
        {
          source: [
            "akitainu:git-diff-source",
            {
              before: "origin/" + process.env.GITHUB_BASE_REF,
              after: "HEAD"
            }
          ],
          checker: ["akitainu-checker-typescript", {
            tsconfig: "./tsconfig.stricter.json"
          }]
        }
      ] : []
    )
  ],
  "reporters": [
    "akitainu:pretty-console-reporter",
    ...(process.env.GITHUB_TOKEN && process.env.PR_NUMBER ? [[
      "akitainu-reporter-github-pr-review",
      {
        "githubToken": process.env.GITHUB_TOKEN,
        "repository": "uhyo/akitainu-playground",
        "prNumber": Number(process.env.PR_NUMBER)
      }
    ]] : [])
  ]
}