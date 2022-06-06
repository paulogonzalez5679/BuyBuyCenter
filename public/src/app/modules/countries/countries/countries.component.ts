import { Component, OnInit } from "@angular/core";
import { CountryService } from "app/services/country/country.service";
import swal from "sweetalert2";
import * as firebase from "firebase/app";
declare var $: any;

export interface DataTable {
  headerRow: string[];
  footerRow?: string[];
  dataRows: string[][];
}
@Component({
  selector: "app-countries",
  templateUrl: "./countries.component.html",
  styleUrls: ["./countries.component.css"],
})
export class CountriesComponent implements OnInit {
  public dataTable: DataTable;
  public tablaDatos;
  public country: Country;
  public city: City;
  public arrayCountries: Country[];
  public arrayCities: any;
  public arrayCitiesAux: City[];
  public isEdit: boolean = false;
  public isEditCity: boolean = false;
  public index: number;

  constructor(public countryService: CountryService) {}

  ngOnInit(): void {
    this.country = {};
    this.city = {};
    this.dataTable = {
      headerRow: [
        "#",
        "ID",
        "País",
        "Código ISO",
        "Cuidades",
        "Editar",
        "Eliminar",
      ],
      dataRows: [],
    };
    this.tablaDatos = $("#datatablesCountry").DataTable({});
    this.arrayCountries = [];
    this.arrayCities = [];
    this.arrayCitiesAux = [];
    this.allCountry();
  }

  allCountry() {
    var respuestapaises = this.countryService.getCountry();
    respuestapaises.subscribe((countries) => {
      var cont = 0;
      this.arrayCountries = [];
      countries.forEach((countriesData: any) => {
        this.arrayCountries.push(countriesData.payload.doc.data());
        var responseCity = this.countryService.getCities(
          countriesData.payload.doc.id
        );
        let contAux = cont;
        responseCity.subscribe((cities) => {
          this.arrayCitiesAux = [];
          cities.forEach((cityData: any) => {
            this.arrayCitiesAux.push(cityData.payload.doc.data());
          });
          this.arrayCities[contAux] = this.arrayCitiesAux;
        });
        cont++;
        if (this.arrayCountries.length == countries.length) {
          this.initDataTable();
        }
      });
    });
  }

  /**
   * *** Metodo para agregar/editar paises ***
   * @param country
   * @param valid
   */
  async addCountry(country: Country, valid: boolean) {
    var arrayCity = [];
    if (valid) {
      this.isEdit
        ? this.countryService.editCountry(country)
        : this.countryService.saveCountry(country);
      this.isEdit = false;
      this.country = {};
      swal("OK", "Registro Exitoso", "success");
    }
  }

  /**
   * *** seleccionamos el pais que se desea editar ***
   * @param country
   */
  async selectedCountry(country: Country, index: number) {
    this.index = index;
    this.isEdit = true;
    this.country = country;
  }

  /**
   * *** Eliminamos un país seleccionado ***
   * @param country
   */
  async deleteCountry(country: Country) {
    swal({
      title: "Alerta",
      text: "¿Está seguro que desea eliminar el pais?",
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn btn-fill btn-success btn-mr-5",
      cancelButtonClass: "btn btn-fill btn-danger",
      confirmButtonText: "Sí, eliminar!",
      buttonsStyling: false,
    }).then((result) => {
      if (result.value) {
        this.countryService.deleteCountryForCode(country.country_id).then(
          () => {},
          (error) => {
            console.error(error);
          }
        );
        this.cleanCity();
      }
    });
  }

  /**
   * *** Metodo para agregar/editar ciudades ***
   * @param city
   * @param valid
   */
  async addCity(city: City, valid: boolean) {
    if (valid) {
      city.city_state = true;
      this.isEditCity
        ? this.countryService.editCity(city, this.country.country_id)
        : this.countryService.addCity(city, this.country.country_id);
      this.cleanCity();
      swal("OK", "Registro Exitoso", "success");
    }
  }

  /**
   * *** Mostramos las ciudades del pais seleccionado ***
   * *** seteamos el valor del pais seleccionado      ***
   * *** seteamos el index para saber la posicion     ***
   * *** del arreglo de ciudades                      ***
   * @param country
   * @param index
   */
  async showCities(country: Country, index: number) {
    this.country = country;
    this.index = index;
  }

  /**
   * *** seleccionamos y seteamos la data de la ciudad  ***
   * @param city
   */
  async editCity(city: City) {
    this.city = city;
    this.isEditCity = true;
  }

  /**
   * *** Eliminamos la ciudad ***
   * @param city
   */
  async deleteCity(city: City) {
    this.city = city;
    swal({
      title: "Alerta",
      text: "¿Está seguro que desea eliminar la ciudad?",
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn btn-fill btn-success btn-mr-5",
      cancelButtonClass: "btn btn-fill btn-danger",
      confirmButtonText: "Sí, eliminar!",
      buttonsStyling: false,
    }).then((result) => {
      if (result.value) {
        this.countryService.deleteCityForCode(this.country, this.city).then(
          () => {},
          (error) => {
            console.error(error);
          }
        );
        this.cleanCity();
      }
    });
  }

  /**
   * *** Metodo para limpiar la data de la ciudad seleccionada ***
   */
  cleanCity() {
    this.isEditCity = false;
    this.city = {};
  }

  initDataTable() {
    let aaa = this.tablaDatos;
    $("#datatablesCountry").DataTable().destroy();
    setTimeout(function () {
      aaa = $("#datatablesCountry").DataTable({
        paging: true,
        ordering: true,
        info: true,
        pagingType: "full_numbers",
        lengthMenu: [
          [10, 25, 50, -1],
          [10, 25, 50, "All"],
        ],
        responsive: true,
        language: {
          search: "_INPUT_",
          searchPlaceholder: "Buscar",
        },
      });
    }, 10);
  }
}
