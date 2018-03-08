import { WindowRefServiceService } from './../window-ref-service.service';
import { ShoppingCart } from './../models/shopping-cart';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { OrderService } from './../order.service';
import { Order } from './../models/order';
import { Products } from './../models/Products';
import { ShoppingCartService } from './../shopping-cart.service';
import { CheckOutInformation } from './../models/checkoutInformation';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit,OnDestroy {
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

checkoutInformation:CheckOutInformation=new CheckOutInformation();
products:Products[]=[];
userId:string;
userSubscription:Subscription;
shoppingCart: ShoppingCart;
isPayment:boolean=false;
shoppingCartQty;
totalPrice;
paymenttoBeMade:boolean=false;
rzp1: any;
title = 'app';
options = {
  'key': 'rzp_test_UJRDD5ZC6f8LXU',
  'amount': 2000, // 2000 paise = INR 20
  'name': 'OShop',
  'description': 'Purchased',
  'image': '/your_logo.png',
  'handler': function(response) {
    this.ss.clearCart();  
    alert(' Thank You for making payment, please enter the shipping details to place the order'
      +response.razorpay_payment_id);
      this.paymentMade=true;
      console.log(this.paymentMade);
      // 
      
  }/*,
  'prefill': {
      'name': 'Harshil Mathur',
      'email': 'harshil@razorpay.com'
  }*/,
  'notes': {
      'address': 'Hello World'
  },
  'theme': {
      'color': '#F37254'
  }
};


save(information){
let order=new Order();
let datePlaced= Date.now();
order.datePlaced=datePlaced;
order.shippingInfo=information;
order.userId=this.userId;
order.items=this.shoppingCart.items;
order.orderId=Date.now();
console.log('order to be saved ');
console.log(order);
let os=this.os.saveOrder(order);
alert('your order no is'+order.orderId)
console.log(os);
this.paymenttoBeMade=true;
//  this.ss.clearCart();
// alert('Thank you for your order. Your order will be delivered to your address shortly')
// this.router.navigate(['/order-success', { totalPrice: this.totalPrice}]);

}


public initPay(): void {
  console.log(this.totalPrice);
  this.options.amount=this.totalPrice*100;
  // this.options.description=this.shoppingCartQty+' items  Purchased';
  this.rzp1 = new this.winRef.nativeWindow.Razorpay(this.options);
  this.rzp1.open();
}


  constructor(private winRef: WindowRefServiceService,public authService:AuthService,private ss: ShoppingCartService,private os:OrderService,
  private router:Router) {
this.userSubscription= this.authService.user$.subscribe(
  user=>{
    console.log(user.uid);
    this.userId=user.uid;
  }
)
    let cart$= ss.getCart();
    cart$.subscribe(
      cart => 
      {
        this.shoppingCart=cart;
       console.log(cart);
       this.shoppingCartQty=0;
       this.totalPrice = 0;
        for(let prodId in cart.items)
        {
          this.shoppingCartQty+=cart.items[prodId].quantity;
          if(cart.items[prodId].quantity >= 1){
           this.totalPrice+=cart.items[prodId].product.price*cart.items[prodId].quantity;
          }
          this.products.push(cart.items[prodId].product);
        }
        console.log(this.totalPrice);
        console.log(this.shoppingCartQty);
      });
   }

   
   makePayment(){
      this.isPayment=true;
   }
   multiplyMethod(totalPrice){
    console.log(totalPrice*100);
    return totalPrice*100;
  }
  ngOnInit() {
  }

}
