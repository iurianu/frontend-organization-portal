import Model, { belongsTo, hasMany } from '@ember-data/model';

export default class PostModel extends Model {
  @belongsTo('role', {
    inverse: null,
    async: false,
  })
  generalRole;

  @belongsTo('organization', {
    inverse: null,
    async: false,
  })
  organization;

  @hasMany('agent-in-position', {
    inverse: 'position',
    async: false,
  })
  agentsInPosition;
}
