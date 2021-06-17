import { Injectable } from '@angular/core';
import {LocalStorageService} from "./local-storage.service";

@Injectable()
export class AuthService {

    constructor(private localStorageService: LocalStorageService) { }

    public isUser() {
        return !!this.getUser();
    }

    public getUser() {
        return this.localStorageService.getItem('user-data');
    }

    public setUser(userData:any) {
        this.localStorageService.setItem('user-data', userData);
    }

    public deleteUser() {
        this.localStorageService.removeItem('user-data');
    }

    public getToken() {
        return this.localStorageService.getItem('user-token');
    }

    public setToken(tokenData) {
        this.localStorageService.setItem('user-token', tokenData);
    }

    public deleteToken() {
        this.localStorageService.removeItem('user-token');
    }

    public logout() {
        this.deleteUser();
        this.deleteToken();
    }

}
