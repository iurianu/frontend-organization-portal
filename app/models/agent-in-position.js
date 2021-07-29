import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class AgentInPositionModel extends Model {
  @attr('date') agentStartDate;
  @attr('date') agentEndDate;

  @belongsTo('post', {
    inverse: 'agentsInPosition',
    async: false,
  })
  position;

  @belongsTo('person', {
    inverse: 'agentsInPosition',
    async: false,
  })
  person;

  @hasMany('contact-point', {
    inverse: null,
    async: false,
  })
  contacts;
}
