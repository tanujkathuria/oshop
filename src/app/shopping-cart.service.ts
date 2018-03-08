import { ShoppingCart } from './models/shopping-cart';
import { Observable } from 'rxjs/Observable';
import { Products } from './models/Products';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';

@Injectable()
export class ShoppingCartService {

  constructor(private db:AngularFireDatabase) { }

  productQuantity;

  private create(){
    return this.db.list('/shopping-carts').push(
      { 
        dateCreated:new Date().getTime()
      })

  }

  async addToCart(product: Products){
    let cart= await this.getOrCreateCartId();
    let item$=this.db.object('shopping-carts/'+cart+'/items/'+product.$key);
    
    item$.take(1).subscribe(
      item =>{
        console.log(item);
        if(item.$exists()){
          console.log('item exist'+item.quantity)
          // this.productQuantity = item.quantity+1;
          item$.update({quantity:item.quantity+1})
        }
        else
        {
          console.log('item does not exist')
          // this.productQuantity=1;
          item$.set({product:product,quantity:1});
        }
      }
    )
  }

  async removeFromCart(product: Products){
    let cart= await this.getOrCreateCartId();
    let item$=this.db.object('shopping-carts/'+cart+'/items/'+product.$key);
    
    item$.take(1).subscribe(
      item =>{
        console.log(item);
        if(item.$exists()){
          console.log('item exist')
          this.productQuantity = item.quantity-1;
          item$.update({quantity:this.productQuantity})
        }
        
      }
    )

  }

   getCart():FirebaseObjectObservable<ShoppingCart>{
    let cartId=localStorage.getItem('cartId');
    return this.db.object('shopping-carts/'+cartId);    
  }
  clearCart(){
    let cartId=localStorage.getItem('cartId');
     this.db.list('shopping-carts/'+cartId+'/items').remove();    
  }

  async getOrCreateCartId(){
    let cartId=localStorage.getItem('cartId');
    if(cartId)
    return cartId;

      let result = await this.create()
      localStorage.setItem('cartId',result.key);
      //Add product to cart 
      return result.key;
  }

  getItem(key){
    let cartId=localStorage.getItem('cartId');
    return this.db.object('shopping-carts/'+cartId+'/items/'+key);
  }

   /*getItem(product){
      console.log(product.$key)
    let cartId=localStorage.getItem('cartId');
    if(cartId){
      let item = this.db.object('shopping-carts/'+cartId+'/items/'+product.$key);
      console.log(item);
    }
  }*/
}
