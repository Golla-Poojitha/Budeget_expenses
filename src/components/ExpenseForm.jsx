import { useState } from 'react'
import { validateExpense } from '../utils/expenses.js'

const CATEGORIES = ['Food', 'Travel', 'Bills', 'Other']

// Props: onAddTransaction receives a validated transaction; local state holds its form fields.
export default function ExpenseForm({ onAddTransaction }) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Food')
  const [type, setType] = useState('expense')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const validationError = validateExpense(title, amount)
    if (validationError) {
      setError(validationError)
      return
    }

    onAddTransaction({
      title: title.trim(),
      amount: Number(amount),
      category,
      type,
    })
    setTitle('')
    setAmount('')
    setCategory('Food')
    setType('expense')
    setError('')
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit} noValidate>
      <fieldset className="type-toggle">
        <legend>Type</legend>
        {['expense', 'income'].map((transactionType) => (
          <label
            className={type === transactionType ? 'type-option selected' : 'type-option'}
            key={transactionType}
          >
            <input
              type="radio"
              name="transaction-type"
              value={transactionType}
              data-cy={`type-${transactionType}`}
              checked={type === transactionType}
              onChange={() => setType(transactionType)}
            />
            {transactionType === 'income' ? 'Income' : 'Expense'}
          </label>
        ))}
      </fieldset>

      <label htmlFor="expense-title">Title</label>
      <input
        id="expense-title"
        data-cy="title"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder={type === 'income' ? 'e.g. Monthly salary' : 'e.g. Weekly groceries'}
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
        <span aria-hidden="true">+</span> Add {type}
      </button>
    </form>
  )
}
