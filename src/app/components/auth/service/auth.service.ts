import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {first} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //public user:User;

  constructor(public auth: AngularFireAuth) { }

  async login(email: string, password: string) {

    const result = await this.auth.signInWithEmailAndPassword(email, password);

    return result;
  }

  async register(email: string, password: string) {
    const result = await this.auth.createUserWithEmailAndPassword(email, password);
    return result;
  }

  async logout() {
    await this.auth.signOut();
   
  }

  getCurrentUser() { 
    return this.auth.authState.pipe(first()).toPromise();
  }
}



