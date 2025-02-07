import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CartBlocComponent } from './components/partials/cart-bloc/cart-bloc.component';
import { EmptyComponent } from './components/partials/empty/empty.component';
import { FoodService } from './services/food.service'; 
import { CartService } from './services/cart.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { RouterModule } from '@angular/router';  

@NgModule({
  declarations: [
    AppComponent,
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule, 
    BrowserAnimationsModule,
    RouterModule,

   
    CartBlocComponent,
    EmptyComponent,
  ],
  providers: [
    CartService, 
    FoodService, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
