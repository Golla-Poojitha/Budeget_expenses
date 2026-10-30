# Expense Tracker

A small React app for recording, filtering, and removing expenses.

## Requirements

- Node.js 20 or newer
- npm

## Run locally

```sh
npm install
npm run dev
```

## Checks

```sh
npm run lint
npm run test:run
npm run build
```

Run Cypress after starting the Vite server in a separate terminal:

```sh
npm run cy:open
npm run cy:run
```

Expenses are kept in memory and reset when the page is reloaded.
