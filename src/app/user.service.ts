import { AppUser } from './models/app-user';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database-deprecated';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class UserService {

  constructor(private db:AngularFireDatabase) { }

  save(user:firebase.User)
  {
    this.db.object('/users/'+user.uid).update(
{
  name:user.displayName,
  email:user.email
})
    }

    get(uid:string)
    {
      return this.db.object('/users/'+uid);
    }
    getAll()
    {
      return this.db.list('/users');
    }

}
