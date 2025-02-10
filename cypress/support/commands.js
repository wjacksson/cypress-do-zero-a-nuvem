
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', data =>{

    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#phone').type(data.number)
    cy.get('#open-text-area').type(data.text)
    cy.contains('button', 'Enviar').click()

})