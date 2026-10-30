const CATEGORIES = ['All', 'Food', 'Travel', 'Bills', 'Other']

// Props: selectedCategory controls the selection; onCategoryChange reports filter updates.
export default function CategoryFilter({ selectedCategory, onCategoryChange }) {
  return (
    <label className="filter-control">
      <span className="sr-only">Filter expenses by category</span>
      <select
        data-cy="filter"
        value={selectedCategory}
        onChange={(event) => onCategoryChange(event.target.value)}
      >
        {CATEGORIES.map((category) => <option key={category}>{category}</option>)}
      </select>
    </label>
  )
}
