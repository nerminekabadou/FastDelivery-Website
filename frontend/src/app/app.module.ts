import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCartComponent } from './components/partials/add-cart/add-cart.component';
import { CartBlocComponent } from './components/partials/cart-bloc/cart-bloc.component';
import { EmptyComponent } from './components/partials/empty/empty.component';
import { EmptySearchComponent } from './components/partials/empty-search/empty-search.component';
import { FoodListComponent } from './components/partials/food-list/food-list.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { MapComponent } from './components/partials/map/map.component';
import { PayButtonComponent } from './components/partials/pay-button/pay-button.component';
import { SearchComponent } from './components/partials/search/search.component';
import { AddCarttextInputComponent } from './components/partials/add-carttext-input/add-carttext-input.component';
import { TextInputComponent } from './components/partials/text-input/text-input.component';

@NgModule({
  declarations: [
    AppComponent,
    AddCartComponent,
    CartBlocComponent,
    EmptyComponent,
    EmptySearchComponent,
    FoodListComponent,
    HeaderComponent,
    MapComponent,
    PayButtonComponent,
    SearchComponent,
    AddCarttextInputComponent,
    TextInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
