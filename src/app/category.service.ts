import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database-deprecated";
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService {

  constructor(private db:AngularFireDatabase) { }

  getCategories()
  {
    console.log(this.db.list('/categories'))  
    return this.db.list('/categories');
  }

}
