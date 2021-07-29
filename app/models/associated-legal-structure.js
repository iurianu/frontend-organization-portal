import Model, { attr, belongsTo } from '@ember-data/model';

export default class AssociatedLegalStructureModel extends Model {
  @attr name;

  @belongsTo('identifier', {
    inverse: null,
    async: false,
  })
  registration;

  @belongsTo('legal-form-type', {
    inverse: null,
    async: false,
  })
  legalType;

  @belongsTo('address', {
    inverse: null,
    async: false,
  })
  address;
}
