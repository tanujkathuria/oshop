import { ShoppingCartItem } from './../../models/shopping-cart-item';
import { OrderService } from './../../order.service';
import { AuthService } from './../../auth.service';
import { Order } from './../../models/order';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
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
              let order$:Order=new Order();
              order$=order;
              for(let prodId in order.items)
              {
                items.push(order.items[prodId]);
              }
              order$.items=items;
              this.orders.push(order);
          }
            console.log(this.orders);
            
          });
        }      }
    )
    
    

  }


  ngOnInit() {
  }



}
