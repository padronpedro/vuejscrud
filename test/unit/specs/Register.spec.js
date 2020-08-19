import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Register from '@/components/pages/Register'
import pSnackBar from '@/components/custom/pSnackBar'
import Vuex from 'vuex'
import { auth } from '@/store/auth.module'

describe('Register.vue', () => {
  let localVue;
  let vuetify;
  let wrapper;
  let store;

  beforeEach(() => {
    localVue = createLocalVue(); // because of vuetify, we should use a localVue instance
    localVue.use(Vuex)
    store = new Vuex.Store({
      modules: {
        auth
      }
    })
    store.dispatch = jest.fn(() => Promise.resolve({ data: 3 }))

    vuetify = new Vuetify();
    wrapper = mount(Register, {
      localVue,
      vuetify,
      store,
      components: {
        pSnackBar
      }
    });
  });

  it('should render the register component and the button', () => {
    expect(wrapper.find('[test-id="btn-register"]').exists()).toBe(true);
  });

  it('should call handleRegister', async () => {
    await wrapper.find('[name="user.name"]').setValue("Test user")
    await wrapper.find('[name="user.email"]').setValue("t@t.com")
    await wrapper.find('[name="user.password"]').setValue("12345678")
    wrapper.find('[test-id="btn-register"]').trigger('click')
    expect(wrapper.vm.$data.loading).toBe(true)
  })
});
