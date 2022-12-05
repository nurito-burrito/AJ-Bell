describe('Instrument Test', () => {
  beforeEach(() => {
    cy.viewport(1366, 768)
    cy.visit('https://www.ajbell.co.uk/research/LSE:GSK')
  })

  it('Validate the URL and check its launched successfully', () => {
    cy.url().should('eq', 'https://www.ajbell.co.uk/research/LSE:GSK')
    })

  it('Validate that Buy, Sell and Regular buttons are present', () => {
    cy.get('[data-testid="buyButton"]').should('be.visible')
    cy.get('[data-testid="sellButton"]').should('be.visible')
    cy.get('[data-testid="regularButton"]').should('be.visible')
    })

  it('Validate that Buy & Sell prices are present and sell value is less than buy value', () => {
     // We need to .invoke('text') to test HTML content 
     // then we need to trim the text to get to the number part before parsing the integer.
     // then parseFloat to convert to to an Int/Float to compare
    cy.get('.ajb-inline-block')
      .first()
      .should('be.visible')
      .invoke('text')
      .then((sliceSellValueText) => {
        const start = sliceSellValueText.indexOf(':')
        const end = sliceSellValueText.indexOf('p', start)
        return sliceSellValueText.slice(start + 1, end)
      })
      .then(parseFloat)
      .should('be.a', 'number')
      .and('equal', 1423.8)
      .then((sellValue) => {
        cy.get('.ajb-inline-block')
        .eq(1)
        .should('be.visible')
        .invoke('text')
        .then((sliceBuyValueText) => {
          const start = sliceBuyValueText.indexOf(':')
          const end = sliceBuyValueText.indexOf('p', start)
          return sliceBuyValueText.slice(start + 1, end)
        })
        .then(parseFloat)
        .should('be.a', 'number')
        .and('equal', 1424.2)
        .then((buyValue) => {
            expect(sellValue).to.be.lessThan(buyValue)
            cy.log('SELL VALUE IS LESS THAN BUY VALUE')
        })
      })
  })

   it('Validate that black banner is present with “Not yet a customer?” link', () => {
    cy.contains('Not yet a customer?')
    cy.get('#login-banner-not-a-customer').should('have.attr', 'href', '/our-services')
    })

    it('Validate that page has Company profile header and check its sector is “Healthcare”', () => {
      cy.get('[data-testid="companyProfileHeader"]').should('have.text', 'Company profile')
      cy.get('[data-testid="sectorValue"]').should('have.text', 'Healthcare')
    })
})