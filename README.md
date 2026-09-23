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

- For the development convenience I decided to use NextJS framework as it comes with a few useful features that sped up the process: hot-reloading, bundling etc. It also provides pages that I thought would be the a better approach than SPA component due to state preserving during navigation
- I also added vitest and @testing-library/react as it's a very popular choice for react projects and I have experience with those libraries
- As the ordering dashboard is a form submission in essence I decided to go for react-hooks-form library + zod which provides validation functionality (+ I used that library on a few projects and am familiar with it)
- intstead of bringing in component library created simple wrappers around HTML elements, styled with Tailwind classes directly. That can be easily swapped for the library when the application grows
- everything in this codebase is a client component - "use client" — no server components or server actions for the forms - simple choice for mocked server
