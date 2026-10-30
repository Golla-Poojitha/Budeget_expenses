describe('Expense tracker', () => {
  it('adds expenses and filters by category', () => {
    cy.visit('/')
    cy.get('[data-cy="title"]').type('Lunch')
    cy.get('[data-cy="amount"]').type('250')
    cy.get('[data-cy="category"]').select('Food')
    cy.get('[data-cy="add-expense"]').click()

    cy.get('[data-cy="title"]').type('Cab')
    cy.get('[data-cy="amount"]').type('400')
    cy.get('[data-cy="category"]').select('Travel')
    cy.get('[data-cy="add-expense"]').click()

    cy.get('[data-cy="total"]').should('contain', '650.00')
    cy.get('[data-cy="filter"]').select('Food')
    cy.get('[data-cy="expense-item"]').should('have.length', 1)
    cy.get('[data-cy="expense-item"]').should('contain', 'Lunch')
    cy.get('[data-cy="count"]').should('contain', '1 expense')
    cy.get('[data-cy="total"]').should('contain', '250.00')
  })

  it('does not add an empty title or negative amount', () => {
    cy.visit('/')
    cy.get('[data-cy="amount"]').type('10')
    cy.get('[data-cy="add-expense"]').click()
    cy.get('[data-cy="expense-item"]').should('not.exist')

    cy.get('[data-cy="title"]').type('Refund')
    cy.get('[data-cy="amount"]').clear().type('-5')
    cy.get('[data-cy="add-expense"]').click()
    cy.get('[data-cy="expense-item"]').should('not.exist')
    cy.get('[data-cy="count"]').should('contain', '0 expenses')
  })

  it('deletes an expense and updates the visible total', () => {
    cy.visit('/')
    cy.get('[data-cy="title"]').type('Coffee')
    cy.get('[data-cy="amount"]').type('5')
    cy.get('[data-cy="add-expense"]').click()
    cy.get('[data-cy="delete-expense"]').click()

    cy.get('[data-cy="expense-item"]').should('not.exist')
    cy.get('[data-cy="total"]').should('contain', '0.00')
    cy.get('[data-cy="count"]').should('contain', '0 expenses')
  })

  it('restores expenses after a page reload', () => {
    cy.visit('/')
    cy.get('[data-cy="title"]').type('Groceries')
    cy.get('[data-cy="amount"]').type('42.50')
    cy.get('[data-cy="category"]').select('Food')
    cy.get('[data-cy="add-expense"]').click()

    cy.reload()
    cy.get('[data-cy="expense-item"]').should('contain', 'Groceries')
    cy.get('[data-cy="total"]').should('contain', '42.50')
    cy.get('[data-cy="count"]').should('contain', '1 expense')
  })
})
