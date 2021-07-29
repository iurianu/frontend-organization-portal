import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class OrganizationModel extends Model {
  @attr name;
  @attr alternativeName;

  @belongsTo('site', {
    inverse: null,
    async: false,
  })
  primarySite;

  @belongsTo('organization-status-code', {
    inverse: null,
    async: false,
  })
  organizationStatus;

  @hasMany('identifier', {
    inverse: null,
    async: false,
  })
  identifiers;

  @hasMany('site', {
    inverse: null,
    async: false,
  })
  sites;

  @hasMany('change-event', {
    inverse: null,
    async: false,
  })
  changedBy;

  @hasMany('change-event', {
    inverse: null,
    async: false,
  })
  resultedFrom;

  @hasMany('post', {
    inverse: null,
    async: false,
  })
  positions;

  @hasMany('organization', {
    inverse: 'isSubOrganizationOf',
    async: false,
  })
  subOrganizations;

  @belongsTo('organization', {
    inverse: 'subOrganizations',
    async: false,
  })
  isSubOrganizationOf;

  @hasMany('organization', {
    inverse: 'isAssociatedWith',
    async: false,
  })
  associatedOrganizations;

  @belongsTo('organization', {
    inverse: 'associatedOrganizations',
    async: false,
  })
  isAssociatedWith;
}
