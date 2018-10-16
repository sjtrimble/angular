import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductPreviewComponent } from './product-preview/product-preview.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ProductListComponent } from './product-list/product-list.component';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [BrowserModule, FormsModule,
    RouterModule.forRoot([
      // { path: 'about', component: ProductListComponent },
      { path: '', component: ProductListComponent }
    ])
    ],
  declarations: [AppComponent, ProductPreviewComponent, TopBarComponent, SideNavComponent, ProductListComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
