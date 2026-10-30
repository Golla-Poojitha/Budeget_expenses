import ExpenseItem from './ExpenseItem.jsx'

// Props: expenses are the visible rows; total and onDeleteExpense update the summary and list.
export default function ExpenseList({ expenses, total, onDeleteExpense }) {
  return (
    <>
      <div className="summary-card">
        <div>
          <span className="summary-label">Total shown</span>
          <span className="expense-count" data-cy="count">
            {expenses.length} {expenses.length === 1 ? 'expense' : 'expenses'}
          </span>
        </div>
        <strong className="total-amount" data-cy="total">${total.toFixed(2)}</strong>
      </div>

      {expenses.length > 0 ? (
        <ul className="expense-list">
          {expenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onDeleteExpense={onDeleteExpense}
            />
          ))}
        </ul>
      ) : (
        <div className="empty-state" data-cy="empty-state">
          <span className="empty-icon" aria-hidden="true">$</span>
          <p>No expenses to show</p>
          <span>Add an expense to see it here.</span>
        </div>
      )}
    </>
  )
}
