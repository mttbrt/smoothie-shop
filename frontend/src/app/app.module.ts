import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SmoothiesComponent } from './smoothies/smoothies.component';
import { SmoothieDetailsComponent } from './smoothies/smoothie-details/smoothie-details.component';
import { SmoothieListItemComponent } from './smoothies/smoothie-list-item/smoothie-list-item.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CartService } from './service/cart.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SmoothiesComponent,
    SmoothieListItemComponent,
    SmoothieDetailsComponent,
    ShoppingCartComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
