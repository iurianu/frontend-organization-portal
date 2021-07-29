import { belongsTo } from '@ember-data/model';
import PostModel from './post';

export default class MinisterPositionModel extends PostModel {
  @belongsTo('minister-position-function', {
    inverse: null,
    async: false,
  })
  function;

  @belongsTo('worship-service', {
    inverse: 'ministerPositions',
    async: false,
  })
  worshipService;

  @belongsTo('representative-body', {
    inverse: 'ministerPositions',
    async: false,
  })
  representativeBody;
}
