import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductPreviewComponent } from './product-preview/product-preview.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SideNavComponent } from './side-nav/side-nav.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'products/:productId', component: ProductDetailsComponent },
      { path: '', component: ProductListComponent },
    ])
    ],
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductPreviewComponent,
    SideNavComponent,
    TopBarComponent,
    ProductDetailsComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
