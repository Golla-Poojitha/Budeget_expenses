import { useEffect, useMemo, useState } from 'react'
import CategoryFilter from './components/CategoryFilter.jsx'
import ExpenseForm from './components/ExpenseForm.jsx'
import ExpenseList from './components/ExpenseList.jsx'
import { calculateTotal } from './utils/expenses.js'

const ALL_CATEGORIES = 'All'
const STORAGE_KEY = 'expense-tracker-expenses'

// State for expenses and the active category filter lives here; App accepts no props.
export default function App() {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = window.localStorage.getItem(STORAGE_KEY)
    return savedExpenses ? JSON.parse(savedExpenses) : []
  })
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
  }, [expenses])

  const visibleExpenses = useMemo(
    () => selectedCategory === ALL_CATEGORIES
      ? expenses
      : expenses.filter((expense) => expense.category === selectedCategory),
    [expenses, selectedCategory],
  )

  function addExpense(expense) {
    setExpenses((currentExpenses) => [
      ...currentExpenses,
      { ...expense, id: crypto.randomUUID() },
    ])
  }

  function deleteExpense(id) {
    setExpenses((currentExpenses) => currentExpenses.filter((expense) => expense.id !== id))
  }

  return (
    <main className="app-shell">
      <header className="page-heading">
        <p className="eyebrow">PERSONAL FINANCE</p>
        <h1>Expense tracker</h1>
        <p className="subtitle">A clearer view of where your money goes.</p>
      </header>

      <div className="dashboard">
        <section className="panel form-panel" aria-labelledby="add-expense-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">GET STARTED</p>
              <h2 id="add-expense-heading">Add an expense</h2>
            </div>
            <span className="heading-icon" aria-hidden="true">+</span>
          </div>
          <ExpenseForm onAddExpense={addExpense} />
        </section>

        <section className="panel expenses-panel" aria-labelledby="expenses-heading">
          <div className="section-heading list-heading">
            <div>
              <p className="eyebrow">YOUR ACTIVITY</p>
              <h2 id="expenses-heading">Expenses</h2>
            </div>
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
          <ExpenseList
            expenses={visibleExpenses}
            total={calculateTotal(visibleExpenses)}
            onDeleteExpense={deleteExpense}
          />
        </section>
      </div>
      <footer>Small steps make a big difference.</footer>
    </main>
  )
}
