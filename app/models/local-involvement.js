import Model, { attr, belongsTo } from '@ember-data/model';

export default class PublicInvolvementModel extends Model {
  @attr percentage;

  @belongsTo('involvement-type', {
    inverse: null,
    async: false,
  })
  involvementType;

  @belongsTo('worship-service', {
    inverse: 'involvements',
    async: false,
  })
  worshipService;

  @belongsTo('administrative-unit', {
    inverse: 'involvedBoards',
    async: false,
  })
  administrativeUnit;
}
