
describe('central de atendimento ao cliente TAT', ()=> {

  beforeEach(()=>{
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', ()=>{
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário',()=>{
   

  })

  it('exibe mensagem de erro ao submeter o formulario com um email com formatação invalida',()=>{
    cy.get('#firstName').type('Jack')
    cy.get('#lastName').type('do Projack')
    cy.get('#email').type('jack.projack.com')
    cy.get('#phone').type('88991919293')
    cy.get('#open-text-area').type('test')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

  })

  it('campo telefone continua vazio quando preenchido com um valor não-numério',()=>{
    cy.get('#phone')
      .type('abcd')
      .should('have.value', '')

  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', ()=>{
    cy.get('#firstName')
      .type('Jack')
      .should('have.value','Jack')
      .clear()
      .should('have.value','')

    cy.get('#lastName')
      .type('do Projack')
      .should('have.value','do Projack')
      .clear()
      .should('have.value','')

    cy.get('#email')
      .type('jack@projack.com')
      .should('have.value','jack@projack.com')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .type('88991919293')
      .should('have.value','88991919293')
      .clear()
      .should('have.value','')

  })
  
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', ()=>{
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })
  
  it('envia o formulário com sucesso usando um comando customizado', ()=>{

    const data ={
      firstName: 'jack',
      lastName: 'do projack',
      email: 'jack@projack.com',
      number: '88999894859',
      text: 'teste.'
    }
    cy.fillMandatoryFieldsAndSubmit(data)

    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', ()=>{
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', ()=>{
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', ()=>{
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"',()=>{
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')

  })

  it('marca cada tipo de atendimento', ()=>{
    cy.get('input[type="radio"]')
      .each((typeOfService)=>{
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', ()=>{
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('Seleciona um arquivo da pasta fixtures', ()=>{
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input =>{
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', ()=>{
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
      .should(input =>{
        expect(input[0].files[0].name).to.equal('example.json')
      })
      
  })

    it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', ()=>{
      cy.fixture('example.json').as('sampleFile')
      cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should(input =>{
        expect(input[0].files[0].name).to.equal('example.json')
      })
    })

    it('Verifica que a politica de privacidade abre em outra aba sem a necessidade de um clique', ()=>{
      cy.contains('a','Política de Privacidade')
        .should('have.attr','href', 'privacy.html')
        .and('have.attr','target', '_blank')
    })
    it('acessa a página da politica de privacidade removendo o target e então clicando no link', ()=>{
      cy.contains('a','Política de Privacidade')
        .invoke('removeAttr', 'target')
        .click()

        cy.contains('h1', 'CAC TAT - Política de Privacidade')
          .should('be.visible')
    })

    it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', ()=>{
      cy.get('.success')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.')
        .invoke('hide')
        .should('not.be.visible')
      cy.get('.error')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!')
        .invoke('hide')
        .should('not.be.visible')
    })

    it('preenche o campo da área de texte usando o comando invoke', ()=>{
      cy.get('#open-text-area')
        .invoke('val', 'um texto qualquer')
        .should('have.value', 'um texto qualquer')
    })

    it("faz uma requisição HTTP", ()=>{
      cy.request({
        method: 'GET',
        url: 'https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html'
      }).then((response) => {
        expect(response.status).to.eq(200); 
        expect(response.statusText).to.eq('OK'); 
        expect(response.body).to.include('CAC TAT'); 
      });
      
    })

    it("find a cat", ()=>{
      cy.request({
        method: 'GET',
        url: 'https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html'
      }).then((response) => {
        expect(response.status).to.eq(200); 

        cy.get('#white-background #cat')
        .invoke('show')
        .should('be.visible')
        .and('contain', '🐈')
        
      })

    })
    
    

})