import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { UserService } from './../user.service';

import { AuthService } from './../auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {


  shoppingCartQty;

  constructor(public authService:AuthService,
  ss: ShoppingCartService) 
  { 
   let cart$= ss.getCart();
   cart$.subscribe(
     cart => {
      this.shoppingCartQty=0;
      console.log(cart);
      for(let prodId in cart.items){
        console.log(cart.items[prodId].quantity);
        this.shoppingCartQty+=cart.items[prodId].quantity;
      }
     }
   )
   // afAuth.authState.subscribe(x=> this.user=x);
  }

  ngOnInit() {
  }

  logout(){
    this.authService.logout();
  }

 

}
