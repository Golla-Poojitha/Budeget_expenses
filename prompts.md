# Prompt library

## New feature

```text
Context: [Describe the current app, relevant files, and existing behavior.]
Goal: [Implement one user-visible feature.]
Constraints: [State boundaries, dependencies, accessibility, and compatibility requirements.]
Acceptance criteria: [List observable outcomes, each independently verifiable by a test.]
Examples: [Provide representative user actions and expected results.]
First inspect the repository and propose a plan. Wait for approval before editing. Work on a
feature branch, add or update tests, run the relevant checks, and summarize the change for a PR.
```

## Bug fix

```text
Context: [Describe the affected behavior and relevant files.]
Goal: Reproduce and fix [specific bug] at its root cause.
Constraints: Preserve [existing behavior]; do not add dependencies.
Acceptance criteria: [List testable reproduction and regression outcomes.]
Examples: Given [input/state], when [action], then [expected result].
First explain the reproduction and propose a plan. Wait for approval before editing.
```

## Refactor

```text
Context: [Describe the existing implementation and its callers.]
Goal: Refactor [specific code] for [clear benefit] without changing behavior.
Constraints: Keep public APIs and user-visible output unchanged; avoid unrelated edits.
Acceptance criteria: Existing tests pass, and [specific structural or measurable condition] holds.
Examples: Before [behavior], after [same behavior].
Inspect first, then propose a plan and wait for approval before editing.
```

## Generate tests

```text
Context: [Describe the feature, current tests, and test stack.]
Goal: Add tests for [named behavior and edge cases].
Constraints: Tests must exercise real observable behavior, be deterministic, and not change
production code. Do not write tests that pass when the behavior is absent.
Acceptance criteria: Each listed case fails when its behavior is deliberately broken and passes
with the correct implementation.
Examples: [Arrange/action/assert examples.]
Run the new tests and explain what each one proves.
```

## Review diff

```text
Context: [Describe the task and expected behavior.]
Goal: Review the proposed diff for correctness, regressions, missing tests, and scope.
Constraints: Do not edit files. Report only actionable findings with file and line references.
Acceptance criteria: Findings are ordered by severity and confidence; explicitly say when none
are found.
Examples: [Relevant expected behavior or edge cases.]
```

## Commit message

```text
Context: [Describe the issue or feature and why it matters.]
Goal: Propose a concise conventional commit message for the staged diff.
Constraints: Do not commit; do not claim changes absent from the diff.
Acceptance criteria: Use an imperative subject under 72 characters and a short body only when
needed.
Examples: feat(expenses): add category filtering
```

## Add expense: five-part feature prompt

1. **Context:** This React expense tracker uses Vite. `App` owns expense state, and
   `ExpenseForm` submits title, amount, and category.
2. **Goal:** Implement adding an expense through the form.
3. **Constraints:** Keep state in `App`, use the existing categories (Food, Travel, Bills,
   Other), add no dependencies, and do not accept invalid values. Keep the form keyboard- and
   screen-reader-accessible.
4. **Acceptance criteria (all testable):**
   - Submitting a trimmed, non-empty title with a finite amount greater than zero and at most
     100,000 adds one row containing that title, amount, and selected category.
   - The total increases by the submitted amount and is rendered with exactly two decimal places.
   - An empty or whitespace-only title does not add a row and displays a validation message.
   - A non-numeric, zero, or negative amount does not add a row and displays a validation message.
   - An amount greater than 100,000 does not add a row and displays a validation message.
   - Successful submission clears the title and amount fields.
5. **Examples:** `Lunch`, `250`, `Food` adds one Food row and shows `$250.00`; a blank title
   with amount `250`, or title `Lunch` with amount `-1`, leaves the list unchanged.

Ask for a plan and wait for approval before changing code. Implement this on its own branch,
add focused tests, run them, and summarize the changes for a pull request.
