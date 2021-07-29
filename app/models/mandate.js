import { hasMany, belongsTo } from '@ember-data/model';
import PostModel from './post';

export default class MandateModel extends PostModel {
  @belongsTo('board-position', {
    inverse: null,
    async: false,
  })
  roleBoard;

  @belongsTo('governing-body', {
    inverse: 'mandates',
    async: false,
  })
  governingBody;

  @hasMany('mandatory', {
    inverse: 'mandate',
    async: false,
  })
  heldBy;
}
