import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {ApiService} from "../../../services/api.service";
import { Router} from "@angular/router";
import {MessageService} from "../../../services/message.service";

@Component({
  selector: 'app-profile-sidebar',
  templateUrl: './profile-sidebar.component.html',
  styleUrls: ['./profile-sidebar.component.scss']
})
export class ProfileSidebarComponent implements OnInit {

  public userData = null;

  constructor(private authService: AuthService,
              private service: ApiService,
              private messageService: MessageService,
              private router: Router) { }

  ngOnInit(): void {

    this.userData = this.authService.getUser();

  }

  public logout() {

    this.authService.logoutUser();
    this.router.navigateByUrl('/');
    this.messageService.send('header', '');

  }

}
