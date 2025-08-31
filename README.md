# AR

## Version

- Node Version [20.16.0]
- Pnpm Version [10.6.1]

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load
[Geist](https://vercel.com/font), a new font family for Vercel.

## Linting & Pre-Commit Checks

This project enforces **linting and commit message formatting** using `pnpm run lint` and a pre-commit hook.

### **Running Linting**

```bash
pnpm run lint
```

If linting fails, **fix the errors before committing.**

### **Commit Message Format**

Commit messages must follow this format:

```bash
type: "Short commit message (30-100 characters)"
```

#### **Allowed types:**

- `feat` - Adding a new feature
- `fix` - Fixing a bug
- `docs` - Documentation changes
- `style` - Code style changes (formatting, missing semicolons)
- `refactor` - Code refactoring without behavior changes
- `perf` - Performance improvements
- `test` - Adding or modifying tests
- `chore` - Maintenance tasks (e.g., build process changes)
- `ci` - Changes to CI/CD setup
- `build` - Build system changes
- `revert` - Reverting previous changes

#### **Example:**

```bash
feat: "Implemented API for user authentication"
fix: "Resolved crash issue in the login flow"
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the
[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the
creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
