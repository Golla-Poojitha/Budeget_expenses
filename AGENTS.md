# Agent instructions

## Stack and layout

- React 18 with Vite, JavaScript, Vitest, React Testing Library, and Cypress.
- `src/App.jsx` owns application state.
- `src/components/` contains one React component per file.
- `src/utils/` contains pure expense logic and its unit tests.
- `src/test/` contains shared test setup.
- `cypress/e2e/` contains browser end-to-end tests.

## Commands

- Install: `npm install`
- Develop: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Unit/component tests: `npm run test:run`
- Cypress interactive: `npm run cy:open`
- Cypress headless: start `npm run dev` in another terminal, then `npm run cy:run`

## Conventions and workflow

- Keep application state in `App`; use one component per file.
- Each React component has a short comment describing its props and state.
- Use stable `data-cy` selectors for end-to-end tests and accessible labels for controls.
- Do not add dependencies without asking first.
- Work on a branch; do not commit directly to `main`.
- Before editing, inspect the repository, propose a plan, and wait for approval.
- Add or update meaningful tests for each behavior change and run the relevant checks.
- Summarize changes, test results, and any known limitations for the pull request.
