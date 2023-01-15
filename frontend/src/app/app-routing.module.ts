import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SmoothiesComponent } from './smoothies/smoothies.component';
import { SmoothieDetailsComponent } from './smoothies/smoothie-details/smoothie-details.component';
import { SmoothieListItemComponent } from './smoothies/smoothie-list-item/smoothie-list-item.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CartService } from './_services/cart.service';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  { 
    path: 'smoothies',
    component: SmoothiesComponent,
    canActivate: [AuthGuard],
    data: {
      allowed_roles: [ 'OWNER', 'USER' ]
    }
  },
  { 
    path: 'cart',
    component: ShoppingCartComponent,
    canActivate: [AuthGuard],
    data: {
      allowed_roles: [ 'USER' ]
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
