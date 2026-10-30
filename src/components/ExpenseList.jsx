import ExpenseItem from './ExpenseItem.jsx'

// Props: transactions are the visible rows; totals and onDeleteTransaction update the summary and list.
export default function ExpenseList({ transactions, totals, onDeleteTransaction }) {
  const formattedBalance = totals.balance < 0
    ? `-$${Math.abs(totals.balance).toFixed(2)}`
    : `$${totals.balance.toFixed(2)}`

  return (
    <>
      <div className="summary-grid">
        <div className="summary-card income-summary">
          <span className="summary-label">Income</span>
          <strong className="total-amount" data-cy="income-total" data-testid="income-total">
            ${totals.income.toFixed(2)}
          </strong>
        </div>
        <div className="summary-card expense-summary">
          <span className="summary-label">Expenses</span>
          <strong className="total-amount" data-cy="total" data-testid="expense-total">
            ${totals.expenses.toFixed(2)}
          </strong>
        </div>
        <div className="summary-card balance-summary">
          <span className="summary-label">Balance</span>
          <strong className="total-amount" data-cy="balance" data-testid="balance">
            {formattedBalance}
          </strong>
        </div>
      </div>
      <p className="transaction-count" data-cy="count">
        Showing {transactions.length} {transactions.length === 1 ? 'transaction' : 'transactions'}
      </p>

      {transactions.length > 0 ? (
        <ul className="expense-list">
          {transactions.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onDeleteExpense={onDeleteTransaction}
            />
          ))}
        </ul>
      ) : (
        <div className="empty-state" data-cy="empty-state">
          <span className="empty-icon" aria-hidden="true">$</span>
          <p>No transactions to show</p>
          <span>Add income or an expense to see it here.</span>
        </div>
      )}
    </>
  )
}
