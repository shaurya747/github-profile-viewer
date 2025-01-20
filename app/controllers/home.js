import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class HomeController extends Controller {
  @service router;
  @tracked username = '';

  @action
  updateUsername(event) {
    this.username = event.target.value;
  }

  @action
  searchUser() {
    if (this.username.trim()) {
      this.router.transitionTo('profile', this.username);
    }
  }

  @action
  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.searchUser();
    }
  }
}