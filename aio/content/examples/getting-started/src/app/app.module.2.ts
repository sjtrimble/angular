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
import { ProductDetailsComponent } from './products/product-details/product-details.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
// #docregion product-list-route, product-details-route
    RouterModule.forRoot([
// #enddocregion product-list-route
      { path: 'products/:productId', component: ProductDetailsComponent },
// #docregion product-list-route
      { path: '', component: ProductListComponent },
    ]),
// #enddocregion product-list-route, product-details-route
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    SideNavComponent,
    ProductListComponent,
    ProductPreviewComponent,
    ProductDetailsComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
