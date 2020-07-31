import { Selector, Role } from 'testcafe';

const UrlSite = `http://localhost:8080`

const loginUser = Role(UrlSite, async t => {
  await t
    .typeText('input[test-id="user-email"]', 'a@a.com')
    .typeText('input[test-id="user-password"]', 'a')
    .click('button[test-id="btn-login"]')
}, { preserveUrl: true });


fixture `Manage Users`
    .beforeEach( async t => {
      await t
          .useRole(loginUser)
          .expect(Selector('button[test-id="UserLogged"]').exists).ok()
    });

test('Add an User', async t => {
  await t
    .click('button[class="v-app-bar__nav-icon v-btn v-btn--flat v-btn--icon v-btn--round theme--dark v-size--default"]')
    .click('div[test-id="MenuAdmUsers"]')
    .click('button[test-id="AdminBtnAddUser"]')
    .typeText('input[test-id="user-email"]', 'test@test.com')
    .typeText('input[test-id="user-password"]', '123123123')
    .typeText('input[test-id="user-name"]', 'User test')
    .pressKey('tab down enter') // select role user
    .pressKey('tab down down enter down enter down enter down enter') // select all permissions for the user
    .click('button[test-id="AddEditUserBtnSave"]')
    .wait(4000)
    .expect(Selector('div[test-id="AdmUsersDatatable"]').exists).ok('User was added')
});

test('Disable User', async t => {
  await t
    .click('button[class="v-app-bar__nav-icon v-btn v-btn--flat v-btn--icon v-btn--round theme--dark v-size--default"]')
    .click('div[test-id="MenuAdmUsers"]')
    .click('button[aria-label="Next page"]')
    .expect(Selector('span[test-id="test@test.com"]').exists).ok()
    .click('button[test-id="AdmUserBtnChgStatus-test@test.com"]')
    .expect(Selector('span[test-id="test@test.com"]').find('span').withText('Disabled').exists).ok('User was disabled')
});

test('Edit User', async t => {
  await t
    .click('button[class="v-app-bar__nav-icon v-btn v-btn--flat v-btn--icon v-btn--round theme--dark v-size--default"]')
    .click('div[test-id="MenuAdmUsers"]')
    .click('button[aria-label="Next page"]')
    .expect(Selector('span[test-id="test@test.com"]').exists).ok()
    .click('button[test-id="AdmUserBtnEdit-test@test.com"]')
    .typeText('input[test-id="user-name"]', 'User test edit')
    .click('button[test-id="AddEditUserBtnSave"]')
    .expect(Selector('div[test-id="AdmUsersDatatable"]').exists).ok('User was modified')
});

test('Delete User', async t => {
  await t
    .click('button[class="v-app-bar__nav-icon v-btn v-btn--flat v-btn--icon v-btn--round theme--dark v-size--default"]')
    .click('div[test-id="MenuAdmUsers"]')
    .click('button[aria-label="Next page"]')
    .expect(Selector('span[test-id="test@test.com"]').exists).ok()
    .click('button[test-id="AdmUserBtnDelete-test@test.com"]')
    .click('button[test-id="DialogContinue"]')
    .click('button[class="v-app-bar__nav-icon v-btn v-btn--flat v-btn--icon v-btn--round theme--dark v-size--default"]')
    .click('div[test-id="MenuAdmUsers"]')
    .click('button[aria-label="Next page"]')
    .expect(Selector('span[test-id="test@test.com"]').exists).notOk('User was deleted')
});
