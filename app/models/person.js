import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class PersonModel extends Model {
  @attr givenName;
  @attr familyName;
  @attr firstNameUsed;

  @hasMany('mandatory', {
    inverse: 'governingAlias',
    async: false,
  })
  mandatories;

  @hasMany('agent-in-position', {
    inverse: 'person',
    async: false,
  })
  agentsInPosition;

  @hasMany('nationality', {
    inverse: null,
    async: false,
  })
  nationalities;

  @belongsTo('date-of-birth', {
    inverse: null,
    async: false,
  })
  dateOfBirth;

  @belongsTo('gender-code', {
    inverse: null,
    async: false,
  })
  gender;
}
