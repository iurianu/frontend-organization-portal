import { hasMany, belongsTo } from '@ember-data/model';
import OrganizationModel from './organization';

export default class AdministrativeUnitModel extends OrganizationModel {
  @belongsTo('administrative-unit-classification-code', {
    inverse: null,
    async: false,
  })
  classification;

  @belongsTo('location', {
    inverse: 'administrativeUnit',
    async: false,
  })
  scope;

  @hasMany('governing-body', {
    inverse: 'administrativeUnit',
    async: false,
  })
  governingBodies;

  @hasMany('local-involvement', {
    inverse: 'administrativeUnit',
    async: false,
  })
  involvedBoards;
}
