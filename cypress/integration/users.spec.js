const testUsers = require('../fixtures/myusers')

describe('CRUD User Module', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
    cy.get('[test-id="user-email"]')
      .type(testUsers[0].email)
    cy.get('[test-id="user-password"')
      .type(testUsers[0].password)
    cy.get('[test-id="btn-login"]').click()
  })

  it('should display users list', () => {
    cy.get('.v-app-bar__nav-icon').click()
    cy.get('[test-id="MenuAdmUsers"').click()
    cy.url().should('include','admin/users')
  })

  it('should add an user', () => {
    cy.get('.v-app-bar__nav-icon').click()
    cy.get('[test-id="MenuAdmUsers"]').click()
    cy.url().should('include','admin/users')

    cy.get('[test-id="AdminBtnAddUser"]').click()
    cy.get('.v-breadcrumbs__item').should('contain','Add User')

    cy.get('[test-id="user-email"]')
      .type(testUsers[1].email)
      .should('have.value', testUsers[1].email)

    cy.get('[test-id="user-password"]')
      .type(testUsers[1].password)

    cy.get('[test-id="user-name"]')
      .type(testUsers[1].name)

    // cy.get('[test-id="RoleSelect"]').parent().click()
    //   .type('{downarrow}')
    cy.get('[test-id="RoleTest"]').parent().click({ delay: 100 })
    cy.get(".v-menu__content").contains("User").click()

    cy.get('[test-id="PermissionTest"]').parent().click()
    cy.get(".v-menu__content").contains("Add Users").click()
    cy.get(".v-menu__content").contains("Manage Users").click()

    cy.get('[test-id="AddEditUserBtnSave"]').click()

    cy.url().should('include','admin/users')
  })

  it('should modify an user', () => {
    cy.get('.v-app-bar__nav-icon').click()
    cy.get('[test-id="MenuAdmUsers"]').click()
    cy.url().should('include','admin/users')

    cy.get('[test-id="AdmUserBtnEdit-'+testUsers[1].email+'"]').click()
    cy.get('.v-breadcrumbs__item').should('contain','Edit User')

    cy.get('[test-id="user-email"]').should('have.value',testUsers[1].email)

    cy.get('[test-id="user-name"]')
      .type('user test new name')

    cy.get('[test-id="AddEditUserBtnSave"]').click()

    cy.url().should('include','admin/users')
  })

  it('should change user status', () => {
    cy.get('.v-app-bar__nav-icon').click()
    cy.get('[test-id="MenuAdmUsers"]').click()
    cy.url().should('include','admin/users')

    let aux = '';
    cy.get('[test-id="Status-'+testUsers[1].email+'"]')
      .then(($value) => {
        aux = $value.text()
        cy.get('[test-id="AdmUserBtnChgStatus-'+testUsers[1].email+'"]').click()
        cy.get('[test-id="Status-'+testUsers[1].email+'"]').should('not.equal', aux)
      })
  })

  it('should delete an user', () => {
    cy.get('.v-app-bar__nav-icon').click()
    cy.get('[test-id="MenuAdmUsers"]').click()
    cy.url().should('include','admin/users')

    cy.get('[test-id="AdmUserBtnDelete-'+testUsers[1].email+'"]').click()
    cy.get('[test-id="DialogContinue"]').click()

    cy.get('[test-id="AdmUserBtnDelete-'+testUsers[1].email+'"]').should('not.exist')
  })


  afterEach(() => {
    // runs after each test in the block
    cy.get('[test-id="btn-logout"]').click()
  })

})
