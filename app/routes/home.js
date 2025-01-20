import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";

export default class HomeRoute extends Route {
  @service githubApi;

  queryParams = {
    page: {
      refreshModel: true,
    },
  };

  async model(params) {
    let page = parseInt(params.page) || 1;
    try {
      const profiles = await this.githubApi.getProfiles(page);
      console.log("Fetched profiles:", profiles);
      return {
        profiles: profiles,
        currentPage: page,
        hasMorePages: profiles.length === 30,
      };
    } catch (error) {
      console.error("Error fetching profiles:", error);
      return {
        profiles: [],
        currentPage: page,
        hasMorePages: false,
      };
    }
  }
}
