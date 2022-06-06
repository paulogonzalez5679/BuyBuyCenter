import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from "@angular/router";
import { IndexComponent } from './index.component';
import { NavbarwwcComponent } from 'app/shared/navbarwwc/navbarwwc/navbarwwc.component';
import { NavbarindexComponent } from 'app/shared/navbarindex/navbarindex/navbarindex.component';

// import { ModalLoginComponent } from './modal-login/modal-login/modal-login.component';
const routes: Routes = [
  { path: "", component: IndexComponent },
  // { path: "", component: ModalLoginComponent }
];

@NgModule({
  declarations: [
    NavbarwwcComponent,
    NavbarindexComponent
  // ModalLoginComponent
],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    // ModalLoginComponent,
  ]
})
export class IndexModule { }
