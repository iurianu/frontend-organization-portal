import JSONAPISerializer from '@ember-data/serializer/json-api';
// eslint-disable-next-line ember/no-mixins
import DataTableSerializerMixin from 'ember-data-table/mixins/serializer';

export default class ApplicationSerializer extends JSONAPISerializer.extend(
  DataTableSerializerMixin
) {
  normalize() {
    let hash = super.normalize(...arguments);

    return removeRelationshipLinks(hash);
  }
}

// Ember Data shows a lot of warnings when it receives relationship links
// for relationships marked as sync. To prevent that we simply strip that data from the payload.
// This shouldn't be an issue since we include the needed relationships already.
// More information: https://discuss.emberjs.com/t/ember-data-jsonapi-and-known-to-be-empty-relationships-that-are-definitely-not-empty/16219
function removeRelationshipLinks(hash) {
  if (hash.data && hash.data.relationships) {
    let relationshipIdentifiers = hash.data.relationships;
    let relationshipNames = Object.keys(relationshipIdentifiers);

    relationshipNames.forEach((relationshipName) => {
      let relationshipIdentifier = relationshipIdentifiers[relationshipName];

      if (!relationshipIdentifier.data) {
        delete relationshipIdentifiers[relationshipName];
      } else if (relationshipIdentifier.links) {
        delete relationshipIdentifier.links;
      }
    });
  }

  return hash;
}
