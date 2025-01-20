import Service from '@ember/service';
import fetch from 'fetch';

export default class GithubApiService extends Service {
  async getProfiles(page = 1) {
    console.log('Fetching profiles for page', page);  
    const response = await fetch(`https://api.github.com/users?since=${page * 30}`);
    const data = await response.json();
    return data;
  }

  async getRepositories(username) {
    console.log('this is username', username);
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`); // Increased per_page to get more repos
    const data = await response.json();
    return data;
  }
}