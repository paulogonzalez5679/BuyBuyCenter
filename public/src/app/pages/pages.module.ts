import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagesRoutes } from './pages.routing';

import { RegisterComponent } from './register/register.component';
import { LockComponent } from './lock/lock.component';
import { LoginComponent } from './login/login.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { NavbarwwcComponent } from 'app/shared/navbarwwc/navbarwwc/navbarwwc.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PagesRoutes),
        FormsModule,
        ReactiveFormsModule,
        MatStepperModule,
        MatButtonModule,
        MatFormFieldModule,
        MatRippleModule,
        JwBootstrapSwitchNg2Module,

    ],
    declarations: [
        LoginComponent,
        RegisterComponent,
        LockComponent,
    ]
})

export class PagesModule {}
