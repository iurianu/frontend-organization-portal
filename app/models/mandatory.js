import { attr, hasMany, belongsTo } from '@ember-data/model';
import AgentInPositionModel from './agent-in-position';
export default class MandatoryModel extends AgentInPositionModel {
  @attr('date') startDate;
  @attr('date') endDate;

  @belongsTo('mandatory-status-code', {
    inverse: null,
    async: false,
  })
  status;

  @belongsTo('person', {
    inverse: 'mandatories',
    async: false,
  })
  governingAlias;

  @belongsTo('mandate', {
    inverse: 'heldBy',
    async: false,
  })
  mandate;

  @hasMany('contact-point', {
    inverse: null,
    async: false,
  })
  contacts;
}
