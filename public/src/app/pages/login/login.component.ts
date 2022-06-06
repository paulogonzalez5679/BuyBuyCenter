import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { User } from 'firebase';
import { AuthService } from 'app/services/auth/auth/auth.service';
import { Router } from '@angular/router'
import { CategoryService } from 'app/services/categorias/categorias.service';


declare var $: any;

declare interface UserLogin {
    email?: string,
    password?: string,
}

@Component({
    moduleId: module.id,
    selector: 'login-cmp',
    templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit {
    public userLogin: UserLogin;
  public arrayCategory: Category[];

    array = []
    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
        password: new FormControl('', Validators.required,),
    })
    test: Date = new Date();
    loginService: any;

    constructor(
        private authservice: AuthService,
        private router: Router,
        private categoryService: CategoryService

    ) { }

    checkFullPageBackgroundImage() {
        var $page = $('.full-page');
        var image_src = $page.data('image');
        if (image_src !== undefined) {
            var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
            $page.append(image_container);
        }
    };

    ngOnInit() {
        this.userLogin = {};
        this.checkFullPageBackgroundImage();
        setTimeout(function () {
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700)
    }

/**
   * *** Optenemos todas las categorias de la DB ***
   */
  async getCategories() {
    await this.categoryService.getCategories().subscribe((categorySnapshot) => {
      this.arrayCategory = [];
      console.log(categorySnapshot);

      categorySnapshot.forEach((categoryData) => {
        console.log(categoryData);

        this.arrayCategory.push(categoryData.payload.doc.data());
        console.log(this.arrayCategory);
      });
    });
  }



    async onLogin(userLogin: UserLogin, valid: boolean) {
        this.array.length
        if (valid) {
            /// consumir el servicio para crear un usuario con email pass
            /// const user = await this.authSvc.register(email, password);
            /// *** si se crea el usuario registramos toda la data en la base de datos ***
            if (userLogin) {
                this.authservice.login(userLogin.email, userLogin.password);
            }
        }
    }
}
