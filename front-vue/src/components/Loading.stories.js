import Loading from "./Loading.vue";

export default {
  title: "Loading",
  component: Loading,
  tags: ['autodocs'],
  /*
  argTypes: {
    size: { control: 'text'},
    borderSize: { control: 'text'},
    borderColor: { control: "color"}
  },
  */
};

const Template = (args) => ({
  components: { Loading },
  setup() {
    return {
      ...args,
    };
  },
  template: '<Loading v-bind="args" />'
});

export const Test1 = Template.bind({});

Test1.args = {
  borderColor: "#cc33ff",
  size: "20rem",
  borderSize: "0.5rem",
};
