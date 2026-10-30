import { describe, expect, it } from 'vitest'
import { calculateTotal, calculateTransactionTotals, validateExpense } from './expenses.js'

describe('validateExpense', () => {
  it('requires a non-empty title', () => {
    expect(validateExpense('   ', '12')).toBe('Enter an expense title.')
  })

  it('requires a numeric amount', () => {
    expect(validateExpense('Lunch', 'nope')).toBe('Enter an amount greater than 0.')
  })

  it('rejects a zero amount', () => {
    expect(validateExpense('Lunch', '0')).toBe('Enter an amount greater than 0.')
  })

  it('rejects a negative amount', () => {
    expect(validateExpense('Lunch', '-2')).toBe('Enter an amount greater than 0.')
  })

  it('rejects an amount above 100,000', () => {
    expect(validateExpense('Laptop', '100000.01')).toBe('Amount must be 100,000 or less.')
  })

  it('accepts a trimmed title and positive decimal amount', () => {
    expect(validateExpense(' Lunch ', '12.5')).toBe('')
  })
})

describe('calculateTotal', () => {
  it('adds expense amounts', () => {
    expect(calculateTotal([{ amount: 250 }, { amount: 400 }])).toBe(650)
  })

  it('returns zero for an empty list', () => {
    expect(calculateTotal([])).toBe(0)
  })
})

describe('calculateTransactionTotals', () => {
  it('separates income and expenses and calculates the remaining balance', () => {
    expect(calculateTransactionTotals([
      { type: 'income', amount: 2000 },
      { type: 'expense', amount: 250 },
      { type: 'expense', amount: 75.5 },
    ])).toEqual({
      income: 2000,
      expenses: 325.5,
      balance: 1674.5,
    })
  })

  it('treats saved entries without a type as expenses', () => {
    expect(calculateTransactionTotals([{ amount: 25 }])).toEqual({
      income: 0,
      expenses: 25,
      balance: -25,
    })
  })
})
