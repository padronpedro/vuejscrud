import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import pBreadCrumbs from '@/components/custom/pBreadCrumbs'

describe('pBreadCrumbs component', () => {
  let localVue;
  let vuetify;
  let wrapper;

  beforeEach(()=> {
    localVue = createLocalVue(); // because of vuetify, we should use a localVue instance

    vuetify = new Vuetify();
    wrapper = mount(pBreadCrumbs, {
      localVue,
      vuetify,
      propsData: {
        items: [
          {
            text: ('Dashboard'),
            disabled: false,
            to: 'Dashboard'
          },
          {
            text: ('Users'),
            disabled: false,
            to: 'AdmUsers'
          },
          {
            text: ('Edit-User'),
            disabled: true,
            to: ''
          }
        ]
      }
    })
  })

  it('should redirect', async () => {
    let spyRedirectTo = jest.spyOn(wrapper.vm,'redirectTo')
    wrapper.find('[test-id="bc-id-Dashboard"] > div').trigger('click')
    expect(spyRedirectTo).toHaveBeenCalled()
  })

  it('should be disabled', async () => {
    let auxItem = wrapper.find('[test-id="bc-id-Edit-User"').classes()
    expect(auxItem).toContain('disabled')
  })

})
