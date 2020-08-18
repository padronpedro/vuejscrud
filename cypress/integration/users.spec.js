beforeEach(() => {
  cy.visit('http://localhost:8080')
  cy.get('[test-id="user-email"]')
    .type('a@a.com')
  cy.get('[test-id="user-password"')
    .type('a')
  cy.get('[test-id="btn-login"]').click()
})

describe('CRUD User Module', () => {
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
      .type('test@test.com')
      .should('have.value', 'test@test.com')

    cy.get('[test-id="user-password"]')
      .type('12345678')

    cy.get('[test-id="user-name"]')
      .type('user test')

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

    cy.get('[test-id="AdmUserBtnEdit-test@test.com"]').click()
    cy.get('.v-breadcrumbs__item').should('contain','Edit User')

    cy.get('[test-id="user-email"]').should('have.value','test@test.com')

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
    cy.get('[test-id="Status-test@test.com"]')
      .then(($value) => {
        aux = $value.text()
        cy.get('[test-id="AdmUserBtnChgStatus-test@test.com"]').click()
        cy.get('[test-id="Status-test@test.com"]').should('not.equal', aux)
      })
  })

  it('should delete an user', () => {
    cy.get('.v-app-bar__nav-icon').click()
    cy.get('[test-id="MenuAdmUsers"]').click()
    cy.url().should('include','admin/users')

    cy.get('[test-id="AdmUserBtnDelete-test@test.com"]').click()
    cy.get('[test-id="DialogContinue"]').click()

    cy.get('[test-id="AdmUserBtnDelete-test@test.com"]').should('not.exist')
  })

})

afterEach(() => {
  // runs after each test in the block
  cy.get('[test-id="btn-logout"]').click()
})
