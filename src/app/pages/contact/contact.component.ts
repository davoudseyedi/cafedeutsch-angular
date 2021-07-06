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

  public btnLoading = false;

  public breadcrumb = [
    {
      name: 'خانه',
      url: '/'
    },
    {
      name: 'تماس با ما',
      url: '/contact'
    }
  ];

  public background = '/assets/img/contact.jpg';
  public subTitle = '                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز';

  public webformModel = {
    name: '',
    email: '',
    message: ''
  };
  public webformModelError = {
    name: '',
    email: '',
    message: ''
  };


  constructor(private api: ApiService,
              private metaService: MetaService,
              private notifier: NotifierService) { }

  ngOnInit(): void {

    this.metaService.setTitle();
    this.metaService.clearMetaTags();


  }

  public postContact(){

    this.btnLoading = true;

    let webform = {
      "webform_id" : 'contact',
      "name" : this.webformModel.name,
      "email": this.webformModel.email,
      "message": this.webformModel.message
    }

    this.api
      .postWebform(webform)
      .subscribe({
        next: this.onLoadContactSuccess.bind(this),
        error: this.onLoadContactError.bind(this)
      });
  }

  private onLoadContactSuccess(response) {

    this.btnLoading = false;
    this.notifier.notify('success', 'Your message has send successfully!');

  }

  private onLoadContactError(res) {

    this.btnLoading = false;

    this.webformModelError = {
      name: res.error.error.name,
      email: res.error.error.email,
      message: res.error.error.message,
    }

    this.notifier.notify('error', res.error.message);
  }

}
