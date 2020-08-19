import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Login from '@/components/pages/Login'
import pSnackBar from '@/components/custom/pSnackBar'
import Vuex from 'vuex'
import { auth } from '@/store/auth.module'

describe('Login.vue', () => {
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
    wrapper = mount(Login, {
      localVue,
      vuetify,
      store,
      components: {
        pSnackBar
      }
    });
  });

  it('should render the login component and the button', () => {
    expect(wrapper.find('[test-id="btn-login"]').exists()).toBe(true);
  });

  it('should login', async () => {
    await wrapper.find('[name="user.email"]').setValue("a@a.com")
    await wrapper.find('[name="user.password"]').setValue("a")
    wrapper.find('[test-id="btn-login"]').trigger('click')
    await localVue.nextTick();
    expect(wrapper.vm.$data.logged).toBe(true)
  })
});
