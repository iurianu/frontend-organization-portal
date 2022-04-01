import Service from '@ember/service';
import fetch from 'fetch';

class AddressSuggestion {
  constructor({
    id,
    street,
    housenumber,
    busNumber,
    zipCode,
    municipality,
    fullAddress,
  }) {
    this.adresRegisterId = id;
    this.street = street;
    this.housenumber = housenumber;
    this.zipCode = zipCode;
    this.municipality = municipality;
    this.fullAddress = fullAddress;
    this.busNumber = busNumber;
  }

  isEmpty() {
    return (
      !this.adresRegisterId &&
      !this.street &&
      !this.housenumber &&
      !this.zipCode &&
      !this.municipality &&
      !this.fullAddress
    );
  }
}

class Address {
  constructor({
    adresRegisterId,
    uri,
    street,
    housenumber,
    busNumber,
    zipCode,
    municipality,
    fullAddress,
  }) {
    this.uri = uri;
    this.adresRegisterId = adresRegisterId;
    this.street = street;
    this.housenumber = housenumber;
    this.busNumber = busNumber;
    this.zipCode = zipCode;
    this.municipality = municipality;
    this.fullAddress = fullAddress;
  }

  // TODO: The dutch properties seem to be a remnant from the code in the original project which isn't really needed here
  // This seems to be an application concern so moving this logic in the app code itself seems the way to go.
  get adresProperties() {
    return {
      straatnaam: this.street,
      huisnummer: this.housenumber,
      busnummer: this.busNumber,
      postcode: this.zipCode,
      gemeentenaam: this.municipality,
      land: null,
      volledigAdres: this.fullAddress,
      adresRegisterId: this.adresRegisterId,
      addressRegisterUri: this.uri,
    };
  }
}

export default class AddressRegisterService extends Service {
  async suggest(query) {
    const results = await (
      await fetch(`/adresses-register/search?query=${query}`)
    ).json();
    return results.adressen.map(function (result) {
      return new AddressSuggestion({
        id: result.ID,
        street: result.Thoroughfarename,
        housenumber: result.Housenumber,
        zipCode: result.Zipcode,
        municipality: result.Municipality,
        fullAddress: result.FormattedAddress,
      });
    });
  }

  async findAll(suggestion) {
    let addresses = [];
    if (!suggestion.isEmpty()) {
      const results = await (
        await fetch(
          `/adresses-register/match?municipality=${suggestion.municipality}&zipcode=${suggestion.zipCode}&thoroughfarename=${suggestion.street}&housenumber=${suggestion.housenumber}`
        )
      ).json();
      addresses = results.map(function (result) {
        return new Address({
          uri: result.identificator.id,
          adresRegisterId: result.identificator.objectId,
          fullAddress: result.volledigAdres.geografischeNaam.spelling,
          street: suggestion.street,
          housenumber: suggestion.housenumber,
          busNumber: result.busnummer ? result.busnummer : null,
          zipCode: suggestion.zipCode,
          municipality: suggestion.municipality,
        });
      });
    }
    return addresses;
  }

  toAddressSuggestion(adresModel) {
    return new AddressSuggestion({
      street: adresModel.street,
      housenumber: adresModel.number,
      busNumber: adresModel.boxNumber,
      zipCode: adresModel.postcode,
      municipality: adresModel.municipality,
      fullAddress: adresModel.fullAddress,
    });
  }
}