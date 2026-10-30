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
    expect(screen.getByText('1 expense')).toBeInTheDocument()
  })

  it('rejects an empty title without adding an expense', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText('Amount'), '10')
    await user.click(screen.getByRole('button', { name: /add expense/i }))

    expect(screen.getByRole('alert')).toHaveTextContent('Enter an expense title.')
    expect(screen.getByText('0 expenses')).toBeInTheDocument()
  })

  it('rejects non-numeric and non-positive amounts', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByLabelText('Title'), 'Train')
    fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '-3' } })
    await user.click(screen.getByRole('button', { name: /add expense/i }))

    expect(screen.getByRole('alert')).toHaveTextContent('Enter an amount greater than 0.')
    expect(screen.getByText('0 expenses')).toBeInTheDocument()
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
    expect(screen.getByText('1 expense')).toBeInTheDocument()
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
    expect(screen.getByText('0 expenses')).toBeInTheDocument()
    expect(screen.getByText('$0.00', { selector: 'strong' })).toBeInTheDocument()
  })
})
