import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {

  constructor(private af:AngularFireDatabase) { }

  create(product){
    return this.af.list('/products').push(product);
  }

  getAll(){
    return this.af.list('/products');
  }

  getProduct(productId){
    return this.af.object('/products/'+productId);
  }

  updateProduct(productId,product){
    return this.af.object('/products/'+productId).update(product);
  }
  deleteProduct(productId){
    return this.af.object('/products/'+productId).remove();
  }

}
