import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { keepLatestTask } from 'ember-concurrency';

export default class PeopleIndexRoute extends Route {
  @service store;
  @service muSearch;
  queryParams = {
    page: { refreshModel: true },
    sort: { refreshModel: true },
    status: { refreshModel: true, replace: true },
    position: { refreshModel: true, replace: true },
    organization: { refreshModel: true, replace: true },
    given_name: { refreshModel: true, replace: true },
    family_name: { refreshModel: true, replace: true },
  };

  model(params) {
    return {
      loadPeopleTaskInstance: this.loadPeopleTask.perform(params),
      loadedPeople: this.loadPeopleTask.lastSuccessful?.value,
    };
  }

  @keepLatestTask
  *loadPeopleTask(params) {
    const filter = {};
    if (params.given_name) {
      filter[':prefix:given_name'] = `${params.given_name.toLowerCase()}`;
    }
    if (params.family_name) {
      filter[':prefix:family_name'] = `${params.family_name.toLowerCase()}`;
    }
    if (params.status) {
      let date = new Date().toISOString().slice(0, -5);
      filter[
        ':query:end_date'
      ] = `(NOT (_exists_:end_date))  OR (end_date:[${date} TO *] ) `;
    }
    if (params.position) {
      filter['position_id'] = params.position;
    }
    if (params.organization) {
      filter['organization_id'] = params.organization;
    }

    return yield this.muSearch.search({
      index: 'people',
      page: params.page,
      size: params.size,
      sort: params.sort,
      filters: filter,
      dataMapping: (data) => {
        const entry = data.attributes;
        entry.end_date = entry.end_date ? new Date(entry.end_date) : null;
        return entry;
      },
    });
  }
}
