import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MetaService} from '../../services/meta.service';
import {NotifierService} from 'angular-notifier';

@Component({
    selector: 'app-footer',
    styleUrls: ['./footer.component.scss'],
    templateUrl: './footer.component.html'
})

export class FooterComponent implements OnInit {

  public btnLoading = false;

  public subscribeModel = {
    email: ''
  }
  public subscribeModelError = {
    email: ''
  }


  constructor(private api: ApiService,
              private metaService: MetaService,
              private notifier: NotifierService) { }

  public ngOnInit() {

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

  private onLoadSubscribeError(res) {

    this.btnLoading = false;
    this.subscribeModelError = {
      email: res.error.error.email,
    }

    this.notifier.notify('error', res.error.message);
  }


}
