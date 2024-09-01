This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# mcq

## What is this?

MCQ is a web application that allows you to create multiple choice questions from a csv file.

## CSV source format

The CSV file should be in the following format:

```csv
Question,Option1,Option2,Option3,...,OptionN,Correct Option
```

For example:

```csv
What is the capital of France?,Paris,London,Berlin,Madrid,Paris
Which animal is known as the "ship of the desert"?,Camel,Horse,Elephant,Lion,Camel
How many planets are there in the solar system?,8,9,10,11,8
```

## How to use

1. Clone the repository
2. Run `npm install` (or `yarn install` or `pnpm install`)
3. Run `npm run dev` (or `yarn dev` or `pnpm dev`)
4. Open [http://localhost:3000](http://localhost:3000) with your browser.
5. Upload a CSV file with the format mentioned above.
