import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from '../../services/message.service';
import {AuthService} from '../../services/auth.service';
import {Subscription} from 'rxjs';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';
import {animation} from "../../services/animations.service";

@Component({
  animations: [animation],
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {

  @Input() public isProfile = false;

  public showDropDown = false;
  public showDropDownAccount = false;

  public isUser = false;
  public userData = null;
  public logoutToken = '';
  public csrfToken = '';

  public listener: Subscription;

  constructor( private messageService: MessageService,
               private service: ApiService,
               private router: Router,
               private authService: AuthService) {

    this.listener =  this.messageService.get()
      .subscribe(message => {

        if ( message.key === 'header' ) {

          this.isUser = this.authService.isUser();
          this.userData = this.authService.getUser();
          // this.logoutToken = this.authService.getLogoutToken();
          // this.csrfToken = this.authService.getCsrfToken();

        }

      });

  }

  public ngOnInit() {

    this.isUser = this.authService.isUser();
    this.userData = this.authService.getUser();
    // this.logoutToken = this.authService.getLogoutToken();
    // this.csrfToken = this.authService.getCsrfToken();

  }

  public openDropDown(type){
    if(type == 'right'){
      this.showDropDown = !this.showDropDown;
    }else{
      this.showDropDownAccount = !this.showDropDownAccount;
    }

  }

  public changeMenuState() {
    this.showDropDown = false;
  }

  public openModal(){
    this.messageService.send('login', null);
  }


  public logout() {


    this.service.logout().subscribe();

    this.authService.logoutUser();
    this.router.navigateByUrl('/');
    this.messageService.send('header', '');

  }



}
