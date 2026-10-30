import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ExpenseItem from './ExpenseItem.jsx'

describe('ExpenseItem', () => {
  it.each(['Bills', 'Other'])('renders the %s category marker', (category) => {
    render(
      <ExpenseItem
        expense={{ id: 'expense-1', title: 'Monthly expense', amount: 12, category }}
        onDeleteExpense={() => {}}
      />,
    )

    expect(screen.getByText(category === 'Bills' ? 'B' : 'O')).toBeInTheDocument()
    expect(screen.getByText(category)).toBeInTheDocument()
  })
})
