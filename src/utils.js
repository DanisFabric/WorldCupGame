import Vue from 'vue/dist/vue.common';

export const message = {
  /**
   * @param {string} text
   */
  success: text => Vue.toasted.show(text, {
    theme: 'primary',
    position: 'top-center',
    duration: 5000,
    icon: 'check_circle',
  }),

  /**
   * @param {string} text
   */
  error: text => Vue.toasted.show(text, {
    theme: 'primary',
    position: 'top-center',
    duration: 5000,
    icon: 'error',
  }),
};

export const hello = 'hello';
