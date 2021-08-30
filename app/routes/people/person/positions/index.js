import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { addPaginationMeta } from 'frontend-contact-hub/utils/data-table';

export default class PeoplePersonPositionsIndexRoute extends Route {
  @service store;

  async model() {
    let { id: personId } = this.paramsFor('people.person');

    let person = await this.store.findRecord('person', personId, {
      reload: true,
      include: [
        'mandatories.mandate.role-board',
        'mandatories.mandate.governing-body.is-time-specialization-of.administrative-unit',
        'agents-in-position',
      ].join(),
    });

    let positions = await person.mandatories;
    addPaginationMeta(positions);

    return {
      person,
      positions,
      ministerPositions: await person.agentsInPosition,
    };
  }
}
