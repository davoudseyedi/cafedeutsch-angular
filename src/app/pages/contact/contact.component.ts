import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MetaService} from '../../services/meta.service';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public background = '/assets/img/contact.jpg';
  public subTitle = 'Through customized & effective business coaching and consulting we provide more\n' +
    'profit, happiness, and freedom for business owners who truly care about people.\n' +
    '\n';

  public webformModel = {
    name: '',
    email: '',
    message: ''
  }
  public webformModelError = {
    name: '',
    email: '',
    message: ''
  }


  constructor(private api: ApiService,
              private metaService: MetaService,
              private notifier: NotifierService) { }

  ngOnInit(): void {

    this.metaService.setTitle();
    this.metaService.clearMetaTags();


  }

  public postContact(){

    let webform = {
      "webform_id" : 'contact',
      "name" : this.webformModel.name,
      "email": this.webformModel.email,
      "message": this.webformModel.message
    }

    this.api
      .postContact(webform)
      .subscribe({
        next: this.onLoadContactSuccess.bind(this),
        error: this.onLoadContactError.bind(this)
      });
  }

  private onLoadContactSuccess(response) {
    console.log(response);
    this.notifier.notify('success', 'Your message has send successfully!');

  }

  private onLoadContactError(error) {
    this.notifier.notify('error', error.error.message);
  }

}
