import { ShoppingCartItem } from './../models/shopping-cart-item';
import { Products } from './../models/Products';
import { ShoppingCart } from './../models/shopping-cart';
import { Order } from './../models/order';
import { AuthService } from './../auth.service';
import { OrderService } from './../order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  userId;
  orders$;
  orders:Order[]=[];
  //initializing p to one
 p: number = 1;

  constructor(public authService:AuthService,private os:OrderService) { 
    this.authService.user$.subscribe(
      user=>{
        if(user){
        console.log(user.uid);
        this.userId=user.uid;
        this.orders$= this.os.getOrders();
        this.orders$.subscribe(
          (orders)=>{
          for(let order of orders){ 
            let items:ShoppingCartItem[]=[];
            if(order.userId === this.userId){
              console.log('userID MATCHED ');
              let order$:Order=new Order();
              order$=order;
              for(let prodId in order.items)
              {
                items.push(order.items[prodId]);
              }
              order$.items=items;
              this.orders.push(order);
            }
          }
            console.log(this.orders);
          });
      }})
    
    

  }

  ngOnInit() {
  }


}
