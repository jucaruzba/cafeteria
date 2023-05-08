import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../shared/user.class';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLogged: any = false;
  constructor(public afAuth: AngularFireAuth) {

    afAuth.authState.subscribe(user => (this.isLogged = user));
  }

  async onLogin(user: User) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(user.email,user.password);
      return result;
    } catch (error) {
      console.log("Error en login", error);
      return null;
    }
  }
  
  async onRegistrer(user: User) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(user.email, user.password);
      return result;
    } catch (error) {
      console.log("Error en registro", error);
      return null;
    }
  }
  async onLogout() {
    try {
      await this.afAuth.signOut();
      console.log("Usuario ha cerrado sesión correctamente");
    } catch (error) {
      console.log("Error en logout", error);
    }
  }
}
