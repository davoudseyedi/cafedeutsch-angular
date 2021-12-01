import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { isPlatformBrowser } from '@angular/common';
import { MessageService } from './message.service';
import { Config } from './config';
import {NotifierService} from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})

export class UserGuard implements CanActivate {

  constructor( private router: Router,
               private authService: AuthService,
               private alertService: NotifierService,
               @Inject(PLATFORM_ID) private platformId: Object,
               private messageService: MessageService ) {  }

  /**
   *
   * @param prev
   * @param next
   */
  canActivate(prev, next) {

    const isUser = this.authService.isUser();
    if ( isUser ) {

      return true;

    }

    // In server node must render page.
    if ( !isPlatformBrowser(this.platformId) ) {

      return true;

    }

    const urlSubLength = this.router.url.indexOf('?') > 0 ? this.router.url.indexOf('?') : this.router.url.length;

    if ( this.router.url.substr(0,  urlSubLength).indexOf('profile') > -1 ) {

      this.router.navigate(['/'], {queryParams: {redirect_link: encodeURI(next.url)}});
      this.messageService.send('login', encodeURI(next.url));
      return false;

    } else {

      this.router.navigate([], {queryParams: {redirect_link: encodeURI(next.url)}});
      this.messageService.send('login', encodeURI(next.url));
      return false;

    }

  }

}
