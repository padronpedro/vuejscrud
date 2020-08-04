import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Login from '@/components/pages/Login'
import store from '@/store'
import pSnackBar from '@/components/custom/pSnackBar'


describe('Login.vue', () => {
  let localVue;
  let vuetify;
  let wrapper;
  beforeEach(() => {
    localVue = createLocalVue(); // because of vuetify, we should use a localVue instance
    vuetify = new Vuetify();
    wrapper = mount(Login, {
      localVue,
      vuetify,
      store,
      mocks: {
        $t: (msg) => msg
      },
      components: {
        pSnackBar
      }
    });
  });
  it('should render the login component and the button', () => {
    expect(wrapper.find('[test-id="btn-login"]').exists()).toBe(true);
  });
});
