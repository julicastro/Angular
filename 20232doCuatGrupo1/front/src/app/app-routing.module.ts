import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { RegisterComponent } from './views/register/register.component';
import { ProductsComponent } from './views/products/products.component';
import { ProductListComponent } from './views/product-list/product-list.component';
import { CarritoComponent } from './views/carrito/carrito.component';
import { ProductDetailComponent } from './views/products/product-detail/product-detail.component';
import { ProductAddComponent } from './views/product-add/product-add.component';
import {CartShopComponent} from "./views/cart-shop/cart-shop.component";
import {ListShopComponent} from "./views/list-shop/list-shop.component";
import { ResetPassComponent } from './views/reset-pass/reset-pass.component';

const routes: Routes = [
    {
        path:"", component: LoginComponent
    },
    {
        path:"home", component: HomeComponent
    },
    {
        path:"register", component: RegisterComponent
    },
    {
        path:"product", component: ProductsComponent
    },
    {
        path:"login", component: LoginComponent
    },
    {
        path:"product-list", component: ProductListComponent
    },
    { path: 'product-list/:nombreProducto', component: ProductListComponent },
    {
        path:"carrito", component: CarritoComponent
    },
    {
        path: 'product/:id', component: ProductDetailComponent
    },
    {
        path:"product-add", component: ProductAddComponent
    },
    {
      path:"list-shop", component: ListShopComponent
    },
    {
      path:"cart-shop/:id", component: CartShopComponent
    },
    {
      path:"reset-pass", component: ResetPassComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
