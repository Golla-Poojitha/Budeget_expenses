export function validateExpense(title, amount) {
  const numericAmount = Number(amount)

  if (!title.trim()) {
    return 'Enter an expense title.'
  }

  if (amount.trim() === '' || !Number.isFinite(numericAmount) || numericAmount <= 0) {
    return 'Enter an amount greater than 0.'
  }

  if (numericAmount > 100000) {
    return 'Amount must be 100,000 or less.'
  }

  return ''
}

export function calculateTotal(expenses) {
  return expenses.reduce((total, expense) => total + expense.amount, 0)
}
