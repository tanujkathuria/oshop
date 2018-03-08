import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { Injectable } from '@angular/core';

@Injectable()
export class OrderService {

  constructor(private db:AngularFireDatabase) { }

saveOrder(order){
  return  this.db.list('/orders').push(order);
}

getOrders(){
  return this.db.list('/orders');
}


}
