import { useState } from 'react'
import { validateExpense } from '../utils/expenses.js'

const CATEGORIES = ['Food', 'Travel', 'Bills', 'Other']

// Props: onAddExpense receives a validated expense; local state holds the form fields and error.
export default function ExpenseForm({ onAddExpense }) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Food')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const validationError = validateExpense(title, amount)
    if (validationError) {
      setError(validationError)
      return
    }

    onAddExpense({
      title: title.trim(),
      amount: Number(amount),
      category,
    })
    setTitle('')
    setAmount('')
    setCategory('Food')
    setError('')
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="expense-title">Title</label>
      <input
        id="expense-title"
        data-cy="title"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="e.g. Weekly groceries"
        aria-invalid={Boolean(error && !title.trim())}
        aria-describedby={error ? 'form-error' : undefined}
      />

      <div className="form-row">
        <div className="field-group">
          <label htmlFor="expense-amount">Amount</label>
          <div className="amount-input">
            <span aria-hidden="true">$</span>
            <input
              id="expense-amount"
              data-cy="amount"
              type="number"
              min="0"
              max="100000"
              step="0.01"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              placeholder="0.00"
              aria-invalid={Boolean(error && (Number(amount) <= 0 || !Number.isFinite(Number(amount))))}
              aria-describedby={error ? 'form-error' : undefined}
            />
          </div>
        </div>
        <div className="field-group">
          <label htmlFor="expense-category">Category</label>
          <select
            id="expense-category"
            data-cy="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {CATEGORIES.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
      </div>

      {error && <p className="form-error" id="form-error" role="alert">{error}</p>}
      <button className="primary-button" data-cy="add-expense" type="submit">
        <span aria-hidden="true">+</span> Add expense
      </button>
    </form>
  )
}
