// #docplaster
// #docregion
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// #docregion router-module
import { RouterModule } from '@angular/router';
// #enddocregion router-module
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductPreviewComponent } from './products/product-preview/product-preview.component';


// #docregion router-module-imports
@NgModule({
  imports: [
// #enddocregion router-module-imports
    BrowserModule,
// #docregion router-module-imports
    // Other imports ...
    RouterModule.forRoot([]),
// #enddocregion router-module-imports
    HttpClientModule,
    ReactiveFormsModule,
// #docregion router-module-imports
  ],
// #enddocregion router-module-imports
  declarations: [
    AppComponent,
    TopBarComponent,
    SideNavComponent,
    ProductListComponent,
    ProductPreviewComponent,
  ],
  bootstrap: [AppComponent],
// #docregion router-module-imports
})
export class AppModule { }
// #enddocregion router-module-imports
