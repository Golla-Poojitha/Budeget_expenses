import { useEffect, useMemo, useState } from 'react'
import CategoryFilter from './components/CategoryFilter.jsx'
import ExpenseForm from './components/ExpenseForm.jsx'
import ExpenseList from './components/ExpenseList.jsx'
import { calculateTransactionTotals } from './utils/expenses.js'

const ALL_CATEGORIES = 'All'
const STORAGE_KEY = 'expense-tracker-expenses'

// State for transactions and the active category filter lives here; App accepts no props.
export default function App() {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = window.localStorage.getItem(STORAGE_KEY)
    return savedTransactions
      ? JSON.parse(savedTransactions).map((transaction) => ({
        ...transaction,
        type: transaction.type ?? 'expense',
      }))
      : []
  })
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
  }, [transactions])

  const visibleTransactions = useMemo(
    () => selectedCategory === ALL_CATEGORIES
      ? transactions
      : transactions.filter((transaction) => transaction.category === selectedCategory),
    [transactions, selectedCategory],
  )

  function addTransaction(transaction) {
    setTransactions((currentTransactions) => [
      ...currentTransactions,
      { ...transaction, id: crypto.randomUUID() },
    ])
  }

  function deleteTransaction(id) {
    setTransactions((currentTransactions) => (
      currentTransactions.filter((transaction) => transaction.id !== id)
    ))
  }

  const totals = calculateTransactionTotals(visibleTransactions)

  return (
    <main className="app-shell">
      <header className="page-heading">
        <p className="eyebrow">PERSONAL FINANCE</p>
        <h1>Income &amp; expenses</h1>
        <p className="subtitle">A clearer view of what comes in and what goes out.</p>
      </header>

      <div className="dashboard">
        <section className="panel form-panel" aria-labelledby="add-transaction-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">GET STARTED</p>
              <h2 id="add-transaction-heading">Add a transaction</h2>
            </div>
            <span className="heading-icon" aria-hidden="true">+</span>
          </div>
          <ExpenseForm onAddTransaction={addTransaction} />
        </section>

        <section className="panel expenses-panel" aria-labelledby="transactions-heading">
          <div className="section-heading list-heading">
            <div>
              <p className="eyebrow">YOUR ACTIVITY</p>
              <h2 id="transactions-heading">Transactions</h2>
            </div>
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
          <ExpenseList
            transactions={visibleTransactions}
            totals={totals}
            onDeleteTransaction={deleteTransaction}
          />
        </section>
      </div>
      <footer>Small steps make a big difference.</footer>
    </main>
  )
}
