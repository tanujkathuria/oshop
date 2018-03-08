import { ShoppingCartService } from './../shopping-cart.service';
import { WindowRefServiceService } from './../window-ref-service.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {
  @Input()
  totalPrice;
  rzp1: any;
  title = 'app';
  pay_id;
  @Input()
  shoppingCartQty;
  paymentMade=false;
  options = {
    'key': 'rzp_test_UJRDD5ZC6f8LXU',
    'amount': 2000, // 2000 paise = INR 20
    'name': 'OShop',
    'description': 'Purchased',
    'image': '/your_logo.png',
    'handler': function(response) {
        alert(' Thank You for placing the order with us, your order will be delivered shortly and payment id is '
        +response.razorpay_payment_id);
        this.paymentMade=true;
        
        
    },
    'notes': {
        'address': 'Hello World'
    },
    'theme': {
        'color': '#F37254'
    }
  };


  constructor(private ss: ShoppingCartService,private winRef: WindowRefServiceService) {
    

  }
  public initPay(): void {
    console.log(this.totalPrice);
    this.options.amount=this.totalPrice;
    this.options.description=this.shoppingCartQty+' items  Purchased';
    this.options.handler = ((response) => {
      alert(' Thank You for placing the order with us, your order will be delivered shortly and payment id is '
      +response.razorpay_payment_id);
      this.pay_id = response.razorpay_payment_id;
      console.log(this.pay_id);
      this.ss.clearCart();
   });
    this.rzp1 = new this.winRef.nativeWindow.Razorpay(this.options);

    this.rzp1.open();

  
  }



  ngOnInit() {
  }

}
