describe('Politica de privacidade do CAC TAT', ()=>{
    it('testa a página da politica de privacidade de forma independente', ()=>{
        cy.visit('./src/privacy.html')

        cy.contains('h1', 'CAC TAT - Política de Privacidade')
          .should('be.visible')
    })

})