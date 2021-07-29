import { hasMany, belongsTo } from '@ember-data/model';
import AgentInPositionModel from './agent-in-position';

export default class MinisterModel extends AgentInPositionModel {
  @belongsTo('minister-position', {
    inverse: null,
    async: false,
  })
  ministerPosition;

  @belongsTo('financing-code', {
    inverse: null,
    async: false,
  })
  financing;

  @hasMany('minister-condition', {
    inverse: null,
    async: false,
  })
  conditions;
}
