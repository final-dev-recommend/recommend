import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

const myRoutes = [ // 追加
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent}
  ];

  export const MY_ROUTES: ModuleWithProviders = 
    RouterModule.forRoot(myRoutes);