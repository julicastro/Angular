import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {UserService} from "../../services/user.service";
import {BuyService} from "../../services/buy.service";

@Component({
  selector: 'app-cart-shop',
  templateUrl: './cart-shop.component.html',
  styleUrls: ['./cart-shop.component.scss']
})
export class CartShopComponent {
  datosUsuario : any;
  buy: any;
  constructor(private us: UserService,private route: ActivatedRoute, private buyService: BuyService, private router: Router) {
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        const buyId = idParam;
        this.buyService.getBuyById(buyId).subscribe(data => {
          if (Array.isArray(data) && data.length > 0) {
            this.buy = data[0];
          } else {
            this.router.navigate(['/404']);
          }
        });
      } else {
        this.router.navigate(['/404']);
      }
    });

  }
}
