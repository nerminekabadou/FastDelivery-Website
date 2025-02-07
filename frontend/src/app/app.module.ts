import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CartBlocComponent } from './components/partials/cart-bloc/cart-bloc.component';
import { EmptyComponent } from './components/partials/empty/empty.component';
import { FoodService } from './services/food.service'; // Import FoodService
import { CartService } from './services/cart.service'; // Import CartService
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // If using animations
import { RouterModule } from '@angular/router';  // Make sure to import RouterModule


@NgModule({
  declarations: [
    AppComponent,
    CartBlocComponent,  // Declaring CartBlocComponent
    EmptyComponent,     // Declaring EmptyComponent
    // Add other components that are used here
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule, 
    BrowserAnimationsModule,
    RouterModule
  ],
  providers: [
    CartService, 
    FoodService, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
