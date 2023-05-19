import Navbar from './Navbar.vue';

export default {
  title: 'Navbar',
  component: Navbar
};

const Template = (args) => ({
  components: { Navbar },
  setup() {
    return { args}
  },
  template: '<Navbar />'
})

export const FirstStory = Template.bind({})

FirstStory.args = {

}
