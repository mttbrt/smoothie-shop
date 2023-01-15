import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { SmoothiesComponent } from './smoothies/smoothies.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  { 
    path: 'smoothies',
    component: SmoothiesComponent,
    canActivate: [AuthGuard],
    data: {
      allowedRoles: [ 'OWNER', 'USER' ]
    }
  },
  { 
    path: 'cart',
    component: ShoppingCartComponent,
    canActivate: [AuthGuard],
    data: {
      allowedRoles: [ 'USER' ]
    }
  },
  { path: 'login', component: LoginComponent },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/page-not-found', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
