// Props: expense supplies the displayed item; onDeleteExpense removes it by id.
export default function ExpenseItem({ expense, onDeleteExpense }) {
  const isIncome = expense.type === 'income'

  return (
    <li
      className={`expense-item ${isIncome ? 'transaction-income' : 'transaction-expense'}`}
      data-cy="expense-item"
    >
      <span className={`category-mark category-${expense.category.toLowerCase()}`} aria-hidden="true">
        {expense.category === 'Food' ? 'F' : expense.category === 'Travel' ? 'T' : expense.category === 'Bills' ? 'B' : 'O'}
      </span>
      <div className="expense-description">
        <span className="expense-title">{expense.title}</span>
        <span className="expense-category">{isIncome ? 'Income' : 'Expense'} · {expense.category}</span>
      </div>
      <span className="expense-amount">
        {isIncome ? '+' : '−'}${expense.amount.toFixed(2)}
      </span>
      <button
        className="delete-button"
        type="button"
        aria-label={`Delete ${expense.title}`}
        data-cy="delete-expense"
        onClick={() => onDeleteExpense(expense.id)}
      >
        <span aria-hidden="true">×</span>
      </button>
    </li>
  )
}
