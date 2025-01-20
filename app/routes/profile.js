import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";

export default class ProfileRoute extends Route {
  @service githubApi;

  queryParams = {
    page: {
      refreshModel: true,
    },
  };

  async model(params) {
    const username = params.username;
    const page = parseInt(params.page) || 1;
    const perPage = 10;

    try {
      const repositories = await this.githubApi.getRepositories(username);

      // Calculate pagination
      const startIndex = (page - 1) * perPage;
      const endIndex = startIndex + perPage;
      const paginatedRepos = repositories.slice(startIndex, endIndex);

      return {
        username,
        repositories: paginatedRepos,
        currentPage: page,
        totalPages: Math.ceil(repositories.length / perPage),
        hasNextPage: endIndex < repositories.length,
        hasPrevPage: page > 1,
      };
    } catch (error) {
      console.error("Error fetching repositories:", error);
      return {
        username,
        repositories: [],
        currentPage: 1,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false,
      };
    }
  }
}
