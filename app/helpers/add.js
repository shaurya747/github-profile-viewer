import { helper } from '@ember/component/helper';

export default helper(function add([a, b]) {
  return parseInt(a) + parseInt(b);
});