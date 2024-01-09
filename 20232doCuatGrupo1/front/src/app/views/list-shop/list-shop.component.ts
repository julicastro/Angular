import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {BuyService} from "../../services/buy.service";
import {Buy} from "../../models/buy";

@Component({
  selector: 'app-list-shop',
  templateUrl: './list-shop.component.html',
  styleUrls: ['./list-shop.component.scss']
})
export class ListShopComponent implements OnInit{
  datosUsuario: any;
  buys: any;
  selectBuy: any;
  constructor(private us: UserService, private  buyService: BuyService) {
    this.datosUsuario = this.us.getUser().subscribe(data => {
      if (Array.isArray(data) && data.length > 0) {
        this.datosUsuario = data[0];
      }
    })

  }
  ngOnInit(): void {

    this.buyService.getBuys().subscribe(data => {
      this.buys = data.filter(compra => compra.user.email=== this.datosUsuario.email);
      console.log(this.buys);
    });
  }
}
