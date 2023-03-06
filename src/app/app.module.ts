import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShowComponent } from './Pages/show/show.component';
import { ContactComponent } from './Pages/contact/contact.component';
import { ExceptionsComponent } from './Pages/exceptions/exceptions.component';
import { AboutComponent } from './Pages/about/about.component';
import { IndexComponent } from './Pages/index/index.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { InfoHeaderComponent } from './Components/info-header/info-header.component';
import { MatIconModule } from '@angular/material/icon'
import {MatInputModule} from '@angular/material/input';
import { SideNavComponent } from './Components/side-nav/side-nav.component';
import { FooterComponent } from './Components/footer/footer.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import { ProductCardComponent } from './Components/product-card/product-card.component';
import {MatButtonModule} from '@angular/material/button';
import { WelcomeComponent } from './Components/welcome/welcome.component';
import { ColorPaletteComponent } from './Components/color-palette/color-palette.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { SearchFieldComponent } from './Components/search-field/search-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import { FavoritesComponent } from './Pages/favorites/favorites.component';
import { CartComponent } from './Pages/cart/cart.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FavProductComponent } from './Components/fav-product/fav-product.component';
import { CheckoutComponent } from './Pages/checkout/checkout.component';
import { AuthGuard } from './shared/auth.guard';
import { PageLoaderComponent } from './Components/page-loader/page-loader.component';
import { RobocheckComponent } from './Components/robocheck/robocheck.component';
@NgModule({
  declarations: [
    AppComponent,
    ShowComponent,
    ContactComponent,
    ExceptionsComponent,
    AboutComponent,
    IndexComponent,
    InfoHeaderComponent,
    SideNavComponent,
    FooterComponent,
    ProductCardComponent,
    WelcomeComponent,
    ColorPaletteComponent,
    SearchFieldComponent,
    FavoritesComponent,
    CartComponent,
    FavProductComponent,
    CheckoutComponent,
    PageLoaderComponent,
    RobocheckComponent
  ],
  imports: [
    ReactiveFormsModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    FormsModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatListModule,
    MatGridListModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: 'index', component: IndexComponent },
      { path: '', redirectTo: '/index', pathMatch: 'full' },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'checkout', component: CheckoutComponent, canActivate:[AuthGuard] },
      { path: 'show/:id', component: ShowComponent },
      { path: 'favorites', component: FavoritesComponent },
      { path: 'cart', component: CartComponent },
      { path: '**', component: ExceptionsComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
