import { Component, OnInit, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { RegisterService } from "app/services/register/register.service";
import swal from "sweetalert2";
import { AuthService } from "app/services/auth/auth/auth.service";
import { FormBuilder } from "@angular/forms";
import { CategoryService } from "app/services/categorias/categorias.service";
import { CountryService } from "app/services/country/country.service";

declare var $: any;

@Component({
  moduleId: module.id,
  selector: "register-cmp",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
  providers: [AuthService],
})
export class RegisterComponent implements OnInit {
  test: Date = new Date();
  public userRegister: Users;
  public isEditable = false;
  public islogging = false;
  public showStepOne: boolean = true;
  public showStepTwo: boolean = false;
  public showStepThree: boolean = false;
  public showStepFour: boolean = false;
  public showStepFive: boolean = false;
  public showStepSix: boolean = false;
  public showStepSeven: boolean = false;
  public arrayCategory: Category[];
  public arrayCountries: Country[];

  constructor(
    private categoryService: CategoryService,
    public countryService: CountryService,
    private authSvc: AuthService,
    private registerService: RegisterService
  ) {}

  ngOnInit() {
    this.userRegister = {
      user_categorys: [],
      user_country: "",
    };
    this.getCategories();
    this.getCountry();
  }

  /**
   * *** Optenemos todas las categorias de la DB ***
   */
  async getCategories() {
    await this.categoryService.getCategories().subscribe((categorySnapshot) => {
      this.arrayCategory = [];
      // this.arrayCategoryAux = [];
      categorySnapshot.forEach((categoryData) => {
        this.arrayCategory.push(categoryData.payload.doc.data());
        // this.arrayCategoryAux.push(categoryData.payload.doc.data());
      });
    });
  }

  /**
   * *** Obtenemos los paises de la DB ***
   */
  getCountry() {
    var respuestapaises = this.countryService.getCountry();
    respuestapaises.subscribe((countries) => {
      var cont = 0;
      this.arrayCountries = [];
      countries.forEach((countriesData: any) => {
        this.arrayCountries.push(countriesData.payload.doc.data());
        cont++;
      });
    });
  }

  selectedCountry(e) {}

  setValues() {
    this.showStepOne = true;
    this.showStepTwo = false;
    this.showStepThree = false;
    this.showStepFour = false;
    this.showStepFive = false;
    this.showStepSix = false;
    this.showStepSeven = false;
  }

  async save() {
    // this.registerService.registrarUsuario(this.registerForm.value);
  }

  /**
   * *** seteamos valores de datos personales ***
   * @param model
   * @param isValid
   */
  async setStepOne(model, isValid) {
    if (isValid) {
      this.showStepOne = !this.showStepOne;
      this.showStepTwo = !this.showStepTwo;
    }
  }

  /**
   * *** seteamos credenciales del usuario ***
   * @param model
   * @param isValid
   */
  async setStepTwo(model, isValid) {
    if (isValid) {
      if (
        this.userRegister.user_password_confirm ==
        this.userRegister.user_password
      ) {
        this.showStepTwo = !this.showStepTwo;
        this.showStepThree = !this.showStepThree;
      } else {
        swal(
          "Verifique las contraseñas",
          "Las contreseñas ingresadas no coinciden",
          "info"
        );
        return;
      }
    }
  }

  /**
   * *** Validamos e codigo enviado al correo ***
   * @param model
   * @param isValid
   */
  async setStepThree(model, isValid) {
    if (isValid) {
      this.showStepThree = !this.showStepThree;
      this.showStepFour = !this.showStepFour;
    }
  }

  /**
   * *** Seteamos la descripcion ***
   * @param model
   * @param isValid
   */
  async setStepFour(model, isValid) {
    if (isValid) {
      this.showStepFour = !this.showStepFour;
      this.showStepFive = !this.showStepFive;
    }
  }

  /**
   * *** Seyeamos las categorias selecionadas por el usuario ***
   * @param model
   * @param isValid
   */
  async setStepFive(model, isValid) {
    this.showStepFive = !this.showStepFive;
    this.showStepSix = !this.showStepSix;
  }

  /**
   * *** Seleccionar/desseleccionar categorias de la tienda ***
   * @param e *** resivimos el event (currentValue=true/false) ***
   * @param category
   * @param index
   */
  selectedCategory(e, category: Category, index: number) {
    console.log(e.currentValue);
    console.log(category, index);
    if (e.currentValue) {
      this.userRegister.user_categorys.push(category);
    } else {
      if (this.userRegister.user_categorys.includes(category)) {
        let i = this.userRegister.user_categorys.indexOf(category);
        this.userRegister.user_categorys.splice(i, 1);
      }
    }
  }

  /**
   * *** Seteamos el pais y la web del usuario ***
   * @param model
   * @param isValid
   */
  async setStepSix(model, isValid) {
    if (isValid) {
      console.log(this.userRegister);

      try {
        if (this.userRegister) {
          await this.authSvc.register(this.userRegister.user_email, this.userRegister.user_password)
          .then(async (result) => {
            await this.registerService.registrarUsuario(this.userRegister);
            this.showStepSix = !this.showStepSix;
            this.showStepSeven = !this.showStepSeven;
          });
          // this.router.navigate(['/home']);
        }
      } catch (error) {}
      
    }
  }

  async setStepSeven(model, isValid) {
    if (isValid) {
      this.showStepSeven = !this.showStepSeven;
    }
  }

  async onRegister(model, isValid) {
    console.log(model);
    // this.islogging = !this.islogging;
    this.showStepOne = !this.showStepOne;
    this.showStepTwo = !this.showStepTwo;
    // var email = userRegister.email;
    // var password = userRegister.password;
    // if (isValid) {
    //   if (userRegister.confirmacionPassword == userRegister.password) {
    //     try {
    //       /// consumir el servicio para crear un usuario con email pass
    //       /// const user = await this.authSvc.register(email, password);
    //       /// *** si se crea el usuario registramos toda la data en la base de datos ***
    //       if (userRegister) {
    //         this.authSvc.register(email, password);

    //         this.registerService.registrarUsuario(userRegister);
    //         // this.router.navigate(['/home']);
    //       }
    //     } catch (error) {}
    //   } else {
    //     swal(
    //       "Verifique las contraseñas",
    //       "LAs contreseñas ingresadas no coinciden",
    //       "error"
    //     );
    //   }
    // }
  }
}
