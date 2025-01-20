import { helper } from '@ember/component/helper';

export default helper(function sub([a, b]) {
  return parseInt(a) - parseInt(b);
});
