import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MetaService} from '../../services/meta.service';
import {NotifierService} from 'angular-notifier';
import {HelpersService} from "../../services/helpers.service";
import {AuthService} from "../../services/auth.service";
import {MessageService} from "../../services/message.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-footer',
  styleUrls: ['./footer.component.scss'],
  templateUrl: './footer.component.html'
})

export class FooterComponent implements OnInit {

  public btnLoading = false;

  public isUser = false;

  public subscribeModel = {
    email: ''
  }
  public subscribeModelError = {
    email: ''
  }

  public listener: Subscription;

  constructor(private messageService: MessageService,
              private api: ApiService,
              private metaService: MetaService,
              private authService: AuthService,
              private helperService: HelpersService,
              private notifier: NotifierService) {

    this.listener =  this.messageService.get()
      .subscribe(message => {

        if ( message.key === 'header' ) {

          this.isUser = this.authService.isUser();

        }

      });

  }

  public ngOnInit() {

    this.isUser = this.authService.isUser();

  }

  public subscribe(){

    this.btnLoading = true;

    let webform = {
      "webform_id" : 'subscribe',
      "email": this.subscribeModel.email
    }

    this.api
      .postWebform(webform)
      .subscribe({
        next: this.onLoadSubscribeSuccess.bind(this),
        error: this.onLoadSubscribeError.bind(this)
      });
  }

  private onLoadSubscribeSuccess(response) {

    this.btnLoading = false;
    this.notifier.notify('success', 'Your message has send successfully!');

  }

  private onLoadSubscribeError(error) {

    this.btnLoading = false;

    this.helperService.handleResponseError(error, this.subscribeModelError, 'email');
    this.notifier.notify('error', error.message);
  }


}
