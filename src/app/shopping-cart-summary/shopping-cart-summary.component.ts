import { ItemKey } from './../models/ItemKey';
import { Router } from '@angular/router';
import { Products } from './../models/Products';
import { ShoppingCartItem } from './../models/shopping-cart-item';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent  {

  @Input()
  isPayment:boolean
  cart$;
  shoppingCartQty;
  items:ShoppingCartItem[]=[];
  totalPrice;
  keys:ItemKey[]=[];
  

  constructor(private ss: ShoppingCartService,private router:Router) { 
    let cart$= ss.getCart();
    cart$.subscribe(
      cart => 
      {
       this.shoppingCartQty=0;
       this.items =[];
       this.totalPrice = 0;
       console.log(cart);
        for(let prodId in cart.items)
        {
         let itemKey:ItemKey=new ItemKey();
         itemKey.product=cart.items[prodId].product;
         itemKey.key=prodId;
         this.keys.push(itemKey);
         this.shoppingCartQty+=cart.items[prodId].quantity;
         if(cart.items[prodId].quantity >= 1){
          this.totalPrice+=cart.items[prodId].product.price*cart.items[prodId].quantity;
          this.items.push(cart.items[prodId] );
         }
       }
      });
    }

    addToCart(p:Products){
      for (let key of this.keys) {
        if(key.product.title == p.title)
        {
          p.$key=key.key;
          break;
        }
      }
      this.ss.addToCart(p);
     
   }
 
   removeFromCart(p:Products){
    for (let key of this.keys) {
      if(key.product.title == p.title)
      {
        p.$key=key.key;
        break;
      }
    }
    this.ss.removeFromCart(p);
  }
    
  clearCart(){
    this.ss.clearCart();
  }
  multiplyMethod(totalPrice){
    console.log(totalPrice*100);
return totalPrice*100;
  }

  

}
