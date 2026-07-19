# StatementLens launch runbook

This is an operator runbook, not authorization to publish. Frankie may prepare and test
the artifact but must not create accounts, buy a domain, change DNS, or launch publicly.

## 1. Resolve the name before publishing

`statementlens.com` is already active and redirects to an unrelated login. The working
name can remain inside the private project, but do not launch with a URL or social profile
that implies control of that domain.

Before approving a public name:

- Search the web, GitHub, app stores, and relevant trademark databases.
- Check the exact domain through a registrar; a missing DNS record does not prove availability.
- Prefer a name whose `.com`, `.app`, or `.dev` does not create product confusion.
- Update the title, README, metadata, filenames, and Show HN draft in one pass if renamed.

This is a branding check, not legal clearance. Get qualified advice if the project becomes commercial.

## 2. Pass the release gate

Use only fictional data.

```bash
node test-logic.js
```

Required result: 166 passed, 0 failed.

Then test the exact `index.html` candidate in a current Chromium browser and Firefox:

1. Open DevTools and clear the Network panel.
2. Load the built-in six-month demo.
3. Search, sort, select a month, and select a category.
4. Copy the summary, print to PDF, and download the categorized CSV.
5. Confirm the app initiates zero network requests after opening.
6. Confirm refresh removes all loaded transactions.
7. Repeat at approximately 390 px and 1280 px viewport widths.
8. Load fictional fixtures for combined Amount and separate Debit/Credit formats.
9. Confirm a description beginning `=`, `+`, `-`, or `@` is neutralized in exported CSV.
10. Confirm a file larger than 20 MB receives the size error rather than being parsed.

Also review the repository for:

- Real names, statements, screenshots, account details, email addresses, tokens, and secrets.
- Placeholder URLs or unsupported claims.
- Untracked generated output.
- Changes that add network, storage, or remote dependencies.

Do not proceed with a privacy, wrong-sign, date, or export-security defect.

## 3. Run the private compatibility test

Ask 5–10 trusted testers to try it privately. Never ask them to upload or send a statement.
Record only completion, import path, sign correctness, time to first useful view, and a
sanitized header fixture when needed.

Public-launch threshold:

- At least eight completed attempts.
- At least 80% automatic-or-mapped import success.
- No unresolved wrong-sign or privacy issue.
- At least one non-author tester understands the privacy boundary from the page alone.

## 4. Publish inspectable source

Create a public GitHub repository only after reviewing its complete file list. Include:

- `index.html`
- `README.md`
- `PRIVACY.md`
- `SECURITY.md`
- `CONTRIBUTING.md`
- `PROJECT_STRATEGY.md`
- `CHANGELOG.md`
- `LICENSE`
- `test-logic.js`
- `_headers`
- `robots.txt`
- `.github/ISSUE_TEMPLATE/`

Initialize and push from the reviewed project directory:

```bash
git init
git add .
git diff --cached --check
git status --short
git commit -m "Release v0.1.0"
git branch -M main
git remote add origin https://github.com/OWNER/REPOSITORY.git
git push -u origin main
git tag -a v0.1.0 -m "StatementLens v0.1.0"
git push origin v0.1.0
```

Enable GitHub private vulnerability reporting, Discussions only if someone will maintain
it, and branch protection if multiple contributors arrive. Attach `index.html` to the
GitHub release so the offline artifact has a stable download.

## 5. Create a Cloudflare Pages preview

Use Cloudflare Pages as a static host. Do not add Workers, Pages Functions, KV, D1,
analytics scripts, or a server-side form.

1. In Cloudflare, create a Pages project and connect the GitHub repository.
2. Choose no framework preset.
3. Use no build command and `.` as the output directory for the current flat layout.
4. Deploy the main branch to a `pages.dev` preview.
5. Leave automatic preview deployments enabled for pull requests.

Before making the link public, verify:

```bash
curl -I https://PROJECT.pages.dev/
```

The response should include the Content Security Policy from `_headers`, especially
`connect-src 'none'` and `frame-ancestors 'none'`, plus `Referrer-Policy: no-referrer`,
`X-Content-Type-Options: nosniff`, and the Permissions Policy.

Repeat the complete release-gate browser test against this exact URL. Confirm that the
HTML's meta CSP and the response CSP do not block the demo, download, print, or favicon.

## 6. Finish link metadata

After the final public URL is known:

- Confirm `<link rel="canonical" href="https://matthewhurt12.github.io/statementlens/">`.
- Confirm `<meta property="og:url" content="https://matthewhurt12.github.io/statementlens/">`.
- Create a 1200×630 preview image using fictional demo data only.
- Add `og:image` and `twitter:image` URLs.
- Re-run tests and the public preview checks.

Do not register or connect a custom domain until the name check and preview are approved.
The `pages.dev` URL is sufficient for private testing and even an initial developer launch.

## 7. Launch to developers first

Read the current Show HN and general Hacker News guidelines immediately before posting.
Do not use a new promotion-only account, ask for votes, or coordinate comments.

Suggested title:

> Show HN: StatementLens – inspect a bank CSV in one offline HTML file

Suggested body:

```text
I wanted the smallest bank-CSV sanity checker I could actually audit.

StatementLens is one HTML file with no dependencies, storage, analytics, or backend.
Its Content Security Policy blocks network connections, and the Node tests extract the
parser directly from the shipping file instead of testing a duplicate.

It shows cash flow, monthly/category charts, and a filterable transaction table, then
exports a spreadsheet-safe categorized CSV. The constraints are intentional: CSV only,
ephemeral, keyword categories, and US-dollar display for now.

Demo: https://matthewhurt12.github.io/statementlens/
Source: https://github.com/matthewhurt12/statementlens

I would especially value feedback on the trust model and on bank layouts that fail.
Please never share a real statement—there is an issue template for exact headers plus
two completely fictional rows.
```

The operator should be available for at least two hours after posting. Answer technical
questions plainly, acknowledge limitations, turn specific reports into issues, and never
argue about the definition of “local.” The precise claim is: the app performs analysis in
the tab, persists nothing, and its CSP blocks application network connections.

## 8. Follow up without spam

Within 48 hours:

- Triage every reproducible report.
- Add sanitized fixtures and regression tests.
- Publish a small patch release with a factual changelog.
- Thank contributors in the issue or release; do not send unsolicited outreach.

Only later post to another community when its rules allow it and the explanation is
tailored to that audience. Repeated identical cross-posts produce weak learning and can
damage trust.

## 9. Thirty-day decision

Continue if the project reaches roughly ten distinct successful real-format imports,
three sanitized format contributions, and at least one meaningful outside issue or
contribution without a serious privacy/correctness defect.

If users like the idea but imports fail, build the Format Doctor described in
`PROJECT_STRATEGY.md`. If people want persistent budgets, PDF, or AI, point them to the
existing stronger tools and resist expanding until the single-file use case proves itself.
