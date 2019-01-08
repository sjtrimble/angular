// #docplaster
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductPreviewComponent } from './products/product-preview/product-preview.component';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  imports: [
    BrowserModule,
// #docregion product-list-route, product-details-route, checkout-route
    RouterModule.forRoot([
// #enddocregion checkout-route
      { path: 'products', loadChildren: './products/products.module#ProductsModule' },
// #enddocregion product-details-route, product-list-route
// #docregion checkout-route
      { path: 'checkout', component: CheckoutComponent },
// #enddocregion checkout-route
// #docregion product-list-route
      { path: '', component: ProductListComponent },
// #docregion product-details-route
    ]),
// #enddocregion product-list-route, product-details-route
    HttpClientModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    SideNavComponent,
    ProductListComponent,
    ProductPreviewComponent,
    CheckoutComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
