
export const generateReviewPrompt = (code) => `
You are a code reviewer. Review the following JS/TS code:

Give a short, one-line response per category below (if no issue found, write "No issues found."):

1. Logic flaws:
2. Best practices:
3. Performance:
4. Formatting:
5. Suggested improvements:
6. Typos

Return categorized feedback in plain English.

Code:
${code}
`;
