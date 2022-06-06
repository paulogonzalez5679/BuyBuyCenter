import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class CountryService {
  constructor(private firestore: AngularFirestore) {}

  getCountry() {
    return this.firestore.collection("countries").snapshotChanges();
  }

  getCountryActive() {
    return this.firestore
      .collection("countries", (ref) => ref.where("estado", "==", true))
      .snapshotChanges();
  }

  editCountry(country: Country) {
    console.log(country);
    return this.firestore
      .collection("countries")
      .doc(country.country_id)
      .update(country);
  }

  saveCountry(country: Country) {
    const current = new Date();
    const timestamp = current.getTime();
    country.country_id = timestamp.toString();
    country.country_state = true;
    return this.firestore
      .collection("countries")
      .doc(timestamp.toString())
      .set(country);
  }

  deleteCountryForCode(uid) {
    // console.log(uid);
    return this.firestore.collection("countries").doc(uid).delete();
  }

  deleteCityForCode(country: Country, city: City) {
    console.log(country.country_id, city.city_id);

    return this.firestore
      .collection("countries")
      .doc(country.country_id)
      .collection("cities")
      .doc(city.city_id)
      .delete();
  }

  getCities(id) {
    return this.firestore
      .collection("countries")
      .doc(id)
      .collection("cities")
      .snapshotChanges();
  }

  getCitiesActives(id) {
    return this.firestore
      .collection("countries")
      .doc(id)
      .collection("cities", (ref) => ref.where("estadoCity", "==", true))
      .snapshotChanges();
  }

  addCity(city: City, country_id: string) {
    console.log(city, country_id);

    const current = new Date();
    const timestamp = current.getTime();
    city.city_id = timestamp.toString();
    return this.firestore
      .collection("countries")
      .doc(country_id)
      .collection("cities")
      .doc(timestamp.toString())
      .set(city);
  }

  editCity(city: City, country_id) {
    console.log(city, country_id);

    return this.firestore
      .collection("countries")
      .doc(country_id)
      .collection("cities")
      .doc(city.city_id)
      .set(city);
  }


  // return this.afs.collection('users'), 


  //     ref => 


  //       ref.where('date', '>=', stringNewDate ).where('date', '<=', stringDate ).limit(7).orderBy('date','asc')


  //     ).valueChanges();

}
