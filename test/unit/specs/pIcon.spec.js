import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import pIcon from '@/components/custom/pIcon'

describe('pIcon component', () => {
  let localVue;
  let vuetify;
  let wrapper;

  beforeEach(()=> {
    localVue = createLocalVue(); // because of vuetify, we should use a localVue instance

    vuetify = new Vuetify();
    wrapper = mount(pIcon, {
      localVue,
      vuetify,
      propsData: {
        iconName: 'mdi-pencil',
        iconText: 'Test Text',
        toPath: 'admin/dashboard',
        hideText: true,
        testId: 'jest'
      }
    })
  })

  it('should call btnFunction', async () => {
    let spybtnFunction = jest.spyOn(wrapper.vm,'btnFunction')
    wrapper.find('[test-id="jest"]').trigger('click')
    expect(spybtnFunction).toHaveBeenCalled()
  })

  it('should not display text', async () => {
    let auxItem = wrapper.find('[test-id="jest"] > span').text()
    expect(auxItem).not.toContain('Test Text')
  })

})
