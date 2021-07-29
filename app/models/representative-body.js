import { belongsTo, hasMany } from '@ember-data/model';
import OrganizationModel from './organization';

export default class RepresentativeBodyModel extends OrganizationModel {
  @belongsTo('recognized-worship-type', {
    inverse: null,
    async: false,
  })
  recognizedWorshipType;

  @hasMany('minister-positions', {
    inverse: 'representativeBody',
    async: false,
  })
  ministerPositions;
}
