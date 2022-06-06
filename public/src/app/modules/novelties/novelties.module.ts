import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NoveltiesComponent } from "./novelties/novelties.component";

const routes: Routes = [{ path: "", component: NoveltiesComponent }];


@NgModule({
  declarations: [NoveltiesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class NoveltiesModule { }
