const { describe } = require('mocha');

describe('Login e registro de usuario alurapic', () => {
    
    beforeEach(() => {
        cy.visit('http://alura-fotos.herokuapp.com');
    })
    
    it('Verificar mensagens de  validacao',() => {
        // - [ ]  verifica mensagens de validacao
        
        cy.contains('a','Register now').click();
        
        cy.contains('button','Register').click();
        
        cy.contains('ap-vmessage','Email is required!')
        .should('be.visible');
        
        cy.contains('button','Register').click();
        
        cy.contains('ap-vmessage','Full name is required!')
        .should('be.visible');
        
        cy.contains('ap-vmessage','User name is required!')
        .should('be.visible');
        
        cy.contains('ap-vmessage','Password is required!')
        .should('be.visible');
        
    })
    
    it('Verificar mensagens de email invalido',() => {
        // - [ ]  verificar mensagens de email invalido
        
        cy.contains('a','Register now').click();
        
        cy.contains('button','Register').click();
                 
        cy.get('input[formcontrolname="email"]').type('rodrigo')

        cy.contains('ap-vmessage','Invalid e-mail')
        .should('be.visible');
    })

    it('Verificar mensagens de senha com menos de 8 caracters',() => {
        // - [ ]  verifica mensagens de senho com menos de 8 caracteres

        cy.contains('a','Register now').click();
        
        cy.contains('button','Register').click();
                 
        cy.get('input[formcontrolname="password"]').type('123')

        cy.contains('button','Register').click();
        
        cy.contains('ap-vmessage','Mininum length is 8')
        .should('be.visible');

        
    })

    it('Fazer login de usuario valido', () =>{
    // - [ ]  fazer login de usuario valido

        
        cy.login('flavio', '123')
        cy.get('button[type="submit"]').click();
        cy.contains('a','(Logout)').should('be.visible');

    })

    it('Fazer login de usuario invalido', () =>{
        //- [ ]  fazer login de usuario invalido

        cy.login('rodrigo','1234')
        cy.on ('window:alert', (str) => {
            expect(str).to.equal('Invalid user name or password')
        })

    })

    // REGISTRO DE USUARIOS DE UMA API
    const usuarios = require('../../fixtures/usuarios.json');
    usuarios.forEach(usuario => {

        /*

        - [ ]  Login e registro de usuarios
        
        - [ ]  registro novo usuário um
        - [ ]  regis novo usuário dois
        - [ ]  registra nova usuário tres
        */
        it.only(`registrando usuario novo' ${usuario.userName}`,()=> {
            cy.contains('a','Register now').click(); 
            cy.get('input[formcontrolname="email"]').type(usuario.email)
            cy.get('input[formcontrolname="fullName"]').type(usuario.fullName)
            cy.get('input[formcontrolname="userName"]').type(usuario.userName)
            cy.get('input[formcontrolname="password"]').type(usuario.password)
            cy.contains('button','Register').click(); 
        })
        

    })
    
})


// FAZENDO BUSCA NA API PARA INFORMAÇÃO

describe ('Buscar fotos e dados',() =>{

    it.only ('buscar fotos do flavio', () =>{
        cy.request({
            method: 'GET',
            url: 'https://apialurapic.herokuapp.com/flavio/photos'
        }).then((res) =>{
            expect(res.status).to.be.equal(200)
            expect(res.body).is.not.empty
            expect(res.body[0]).to.have.property('description')
            expect(res.body[0].description).to.be.equal('Farol iluminado')
        }
        )
    })

    it ('buscar usuario', () =>{
        cy.request({
            method: 'POST',
            url: 'https://apialurapic.herokuapp.com/user/login',
            body: Cypress.env()

        }).then((res) =>{
            expect(res.status).to.be.equal(200)
            expect(res.body).is.not.empty
            expect(res.body).to.have.property('email')
            expect(res.body.email).to.be.equal('flavio@alurapic.com.br')
            expect(res.body).to.have.property('id')
            expect(res.body.id).to.be.equal(1)
        }
        )
    })
})

/* 


- [ ]  verifica mensagens tela inicial
- [ ]  verifica botão habilitado na tela inicial
- [ ]  verifica nome da aplicação na tela inicial
- [ ]  vertica menu clicavel telo inicial

*/