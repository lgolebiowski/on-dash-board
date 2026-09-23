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

## Design decisions

- For the development convenience I decided to use NextJS framework as it come s with a few useful features that sped up the process: battery included testing suite, hot-reloading, bundling etc. It also provides pages that I thought would be the a better approach than SPA component due to state preserving during navigation
- As the ordering dashboard is a form submission in essence I decided to go for react-hooks-form library which provides validation functionality (+ I used that library on a few projects and am familiar with it)
- I haven't used any component library as the amount of components in this app was meant to be minimal
