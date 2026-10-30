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
    cy.get('[data-cy="count"]').should('contain', '1 transaction')
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
    cy.get('[data-cy="count"]').should('contain', '0 transactions')
  })

  it('deletes an expense and updates the visible total', () => {
    cy.visit('/')
    cy.get('[data-cy="title"]').type('Coffee')
    cy.get('[data-cy="amount"]').type('5')
    cy.get('[data-cy="add-expense"]').click()
    cy.get('[data-cy="delete-expense"]').click()

    cy.get('[data-cy="expense-item"]').should('not.exist')
    cy.get('[data-cy="total"]').should('contain', '0.00')
    cy.get('[data-cy="count"]').should('contain', '0 transactions')
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
    cy.get('[data-cy="count"]').should('contain', '1 transaction')
  })

  it('adds income and an expense and displays the balance', () => {
    cy.visit('/')
    cy.get('[data-cy="type-income"]').check()
    cy.get('[data-cy="title"]').type('Paycheck')
    cy.get('[data-cy="amount"]').type('3000')
    cy.get('[data-cy="add-expense"]').click()

    cy.get('[data-cy="title"]').type('Rent')
    cy.get('[data-cy="amount"]').type('1200')
    cy.get('[data-cy="category"]').select('Bills')
    cy.get('[data-cy="add-expense"]').click()

    cy.get('[data-cy="expense-item"]').should('have.length', 2)
    cy.get('[data-cy="income-total"]').should('contain', '3000.00')
    cy.get('[data-cy="total"]').should('contain', '1200.00')
    cy.get('[data-cy="balance"]').should('contain', '1800.00')
    cy.get('[data-cy="count"]').should('contain', '2 transactions')
  })
})
