import Site from './site.js';

class ShopeeSite extends Site {
  getOptions() {
    return {
      wait_for_css: '[data-sqe=\'item\']',
    };
  }
}

export default ShopeeSite;
