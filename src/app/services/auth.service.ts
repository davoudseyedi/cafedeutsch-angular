import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class AuthService {

  constructor( private localStorageService: LocalStorageService ) { }

  public getUser() {
    return this.localStorageService.getItem('user-data');
  }

  public setUserToken(tokenData) {
    this.localStorageService.setItem('user-token', tokenData);
  }


  public setUser(userData: any) {

    // for ( const item of userData['roles'] ) {
    //
    //   userData[item] = true;
    //
    // }

    this.localStorageService.setItem('user-data', userData);
  }

  public getUserToken() {
    return this.localStorageService.getItem('user-token');
  }

  public isUser() {
    return !!this.getUser();
  }

  public deleteUser() {
    this.localStorageService.removeItem('user-data');
    this.localStorageService.removeItem('user-token');
  }

  public logout() {
    this.deleteUser();
  }

  public logoutUser() {
    this.deleteUser();
  }

  public checkProfilePermission(role= '') {

    const user = this.getUser();

    if ( user && user.roles && user.roles.indexOf(role) > -1 ) {

      return true;

    } else {

      return false;

    }

  }

}
