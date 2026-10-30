import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App.jsx'

describe('expense tracker', () => {
  it('adds a valid expense and updates the total and count', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText('Title'), 'Lunch')
    await user.type(screen.getByLabelText('Amount'), '250')
    await user.click(screen.getByRole('button', { name: /add expense/i }))

    expect(screen.getByText('Lunch')).toBeInTheDocument()
    expect(screen.getByText('$250.00', { selector: 'strong' })).toBeInTheDocument()
    expect(screen.getByText('Showing 1 transaction')).toBeInTheDocument()
  })

  it('rejects an empty title without adding an expense', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText('Amount'), '10')
    await user.click(screen.getByRole('button', { name: /add expense/i }))

    expect(screen.getByRole('alert')).toHaveTextContent('Enter an expense title.')
    expect(screen.getByText('Showing 0 transactions')).toBeInTheDocument()
  })

  it('rejects non-numeric and non-positive amounts', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByLabelText('Title'), 'Train')
    fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '-3' } })
    await user.click(screen.getByRole('button', { name: /add expense/i }))

    expect(screen.getByRole('alert')).toHaveTextContent('Enter an amount greater than 0.')
    expect(screen.getByText('Showing 0 transactions')).toBeInTheDocument()
  })

  it('filters expenses and updates visible count and total', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByLabelText('Title'), 'Lunch')
    await user.type(screen.getByLabelText('Amount'), '250')
    await user.click(screen.getByRole('button', { name: /add expense/i }))
    await user.type(screen.getByLabelText('Title'), 'Cab')
    await user.type(screen.getByLabelText('Amount'), '400')
    await user.selectOptions(screen.getByLabelText('Category'), 'Travel')
    await user.click(screen.getByRole('button', { name: /add expense/i }))

    await user.selectOptions(screen.getByLabelText('Filter expenses by category'), 'Food')

    expect(screen.getByText('Lunch')).toBeInTheDocument()
    expect(screen.queryByText('Cab')).not.toBeInTheDocument()
    expect(screen.getByText('Showing 1 transaction')).toBeInTheDocument()
    expect(screen.getByText('$250.00', { selector: 'strong' })).toBeInTheDocument()
  })

  it('deletes an expense and recalculates the total', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByLabelText('Title'), 'Coffee')
    await user.type(screen.getByLabelText('Amount'), '5')
    await user.click(screen.getByRole('button', { name: /add expense/i }))
    await user.click(screen.getByRole('button', { name: 'Delete Coffee' }))

    expect(screen.queryByText('Coffee')).not.toBeInTheDocument()
    expect(screen.getByText('Showing 0 transactions')).toBeInTheDocument()
    expect(screen.getByTestId('expense-total')).toHaveTextContent('$0.00')
  })

  it('persists expenses across reloads and saves deletions', async () => {
    const user = userEvent.setup()
    const { unmount } = render(<App />)
    await user.type(screen.getByLabelText('Title'), 'Groceries')
    await user.type(screen.getByLabelText('Amount'), '42.50')
    await user.selectOptions(screen.getByLabelText('Category'), 'Food')
    await user.click(screen.getByRole('button', { name: /add expense/i }))

    expect(JSON.parse(window.localStorage.getItem('expense-tracker-expenses'))).toHaveLength(1)
    unmount()

    render(<App />)
    expect(screen.getByText('Groceries')).toBeInTheDocument()
    expect(screen.getByText('$42.50', { selector: 'strong' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Delete Groceries' }))
    expect(JSON.parse(window.localStorage.getItem('expense-tracker-expenses'))).toEqual([])
  })

  it('adds income and calculates the remaining balance after expenses', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('radio', { name: 'Income' }))
    await user.type(screen.getByLabelText('Title'), 'Paycheck')
    await user.type(screen.getByLabelText('Amount'), '3000')
    await user.click(screen.getByRole('button', { name: 'Add income' }))

    await user.type(screen.getByLabelText('Title'), 'Rent')
    await user.type(screen.getByLabelText('Amount'), '1200')
    await user.selectOptions(screen.getByLabelText('Category'), 'Bills')
    await user.click(screen.getByRole('button', { name: 'Add expense' }))

    expect(screen.getByText('Paycheck')).toBeInTheDocument()
    expect(screen.getByText('+$3000.00')).toBeInTheDocument()
    expect(screen.getByText('−$1200.00')).toBeInTheDocument()
    expect(screen.getByTestId('income-total')).toHaveTextContent('$3000.00')
    expect(screen.getByTestId('expense-total')).toHaveTextContent('$1200.00')
    expect(screen.getByTestId('balance')).toHaveTextContent('$1800.00')
    expect(screen.getByText('Showing 2 transactions')).toBeInTheDocument()
  })

  it('formats a negative balance with the minus sign before the currency symbol', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText('Title'), 'Utilities')
    await user.type(screen.getByLabelText('Amount'), '120')
    await user.click(screen.getByRole('button', { name: 'Add expense' }))

    expect(screen.getByTestId('balance')).toHaveTextContent('-$120.00')
  })
})
