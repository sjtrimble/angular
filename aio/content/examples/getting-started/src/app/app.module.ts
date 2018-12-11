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
// import { ProductDetailsComponent } from './product-details/product-details.component';
// import { CheckoutFormComponent } from './checkout-form/checkout-form.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: ProductListComponent },
      { path: 'products/:productId', loadChildren: './product-details/product-details.module#ProductDetailsModule' }
    ]),
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    SideNavComponent,
    ProductListComponent,
    ProductPreviewComponent,
    // ProductDetailsComponent,
    // CheckoutFormComponent
  ],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule { }
