import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { ProductsComponent } from './views/products/products.component';
import { CarritoComponent } from './views/carrito/carrito.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { CardComponent } from './layouts/card/card.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { ProductDetailComponent } from './views/products/product-detail/product-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HCardComponent } from './layouts/h-card/h-card.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProductListComponent } from './views/product-list/product-list.component';
import { DCardComponent } from './layouts/d-card/d-card.component';
import {MatCardModule} from "@angular/material/card";
import { NotfoundpageComponent } from './layouts/notfoundpage/notfoundpage.component';
import { SpinnerComponent } from './layouts/spinner/spinner.component';
import { LoadingInterceptor } from './interceptors/LoadingInterceptor';
import { SpinnerService } from './services/spinner.service';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { ProductAddComponent } from './views/product-add/product-add.component';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CartShopComponent } from './views/cart-shop/cart-shop.component';
import { ListShopComponent } from './views/list-shop/list-shop.component';
import { ResetPassComponent } from './views/reset-pass/reset-pass.component';
import { DateFormatPipe } from './pipes/date-format.pipe'; 


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    CarritoComponent,
    HeaderComponent,
    FooterComponent,
    CardComponent,
    LoginComponent,
    RegisterComponent,
    ProductDetailComponent,
    HCardComponent,
    ProductListComponent,
    ProductDetailComponent,
    DCardComponent,
    CardComponent,
    NotfoundpageComponent,
    SpinnerComponent,
    ProductAddComponent,
    CartShopComponent,
    ListShopComponent,
    ResetPassComponent,
    DateFormatPipe
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatCardModule,
        FormsModule,
        NgxPaginationModule,
        provideFirebaseApp(() => initializeApp({"projectId":"tallerweb2-71724","appId":"1:648579866757:web:69c5c3ab6180a3217549ec","storageBucket":"tallerweb2-71724.appspot.com","apiKey":"AIzaSyAYpb1VQtt-v3v-vYf2ouVNfwLUthpzD40","authDomain":"tallerweb2-71724.firebaseapp.com","messagingSenderId":"648579866757","measurementId":"G-5GPXHH9NEW"})),
        provideAuth(() => getAuth()),
        ToastrModule.forRoot({
          timeOut: 2000,
          positionClass: 'toast-top-right',
          preventDuplicates: true,
        }),
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    SpinnerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
