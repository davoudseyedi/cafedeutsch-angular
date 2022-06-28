import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MetaService} from '../../services/meta.service';
import { NotifierService } from 'angular-notifier';
import {AuthService} from "../../services/auth.service";
import {Language} from "../../services/language";


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
              private authService : AuthService,
              private notifier: NotifierService) { }

  ngOnInit(): void {

    this.metaService.setTitle(Language.getTitle('CONTACT'));
    this.metaService.setDescription(Language.getDescription('CONTACT'));

    this.webformModel.name = this.authService.getUser() && this.authService.getUser()['full_name'].length > 0 ? this.authService.getUser()['full_name'] : '';
    this.webformModel.email = this.authService.getUser() && this.authService.getUser()['email'].length > 0 ? this.authService.getUser()['email'] : '';


  }

  public postContact(){

    this.btnLoading = true;

    let webform = {
      "full_name" : this.webformModel.name,
      "email": this.webformModel.email,
      "content": this.webformModel.message
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
    this.notifier.notify('success', 'پیام شما با موفقیت ارسال شد.');

  }

  private onLoadContactError(res) {

    this.btnLoading = false;

    this.webformModelError = {
      name: res.error.name,
      email: res.error.email,
      message: res.error.message,
    };

    this.notifier.notify('error', 'لطفا فیلد های خالی رو پر کنید');
  }

}
