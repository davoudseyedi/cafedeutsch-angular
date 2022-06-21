import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {ApiService} from '../../services/api.service';
import {HelpersService} from '../../services/helpers.service';
import {NotifierService} from 'angular-notifier';
import {MessageService} from '../../services/message.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {


  @Input() public redirectLink: string;

  public userData = null;
  public userId = 0;

  public pageState = 'login';
  public btnLoading = false;

  @ViewChild('modalOpener', {static: true}) public modalOpener: ElementRef;
  @ViewChild('modalCloser', {static: true}) public modalCloser: ElementRef;




  public formModel = {
    name: '',
    pass: '',
    email: '',
    confirmpass: '',
    code: ''
  };

  public errorModel = {
    name: '',
    pass: '',
    email: '',
    confirmpass: '',
    code: ''
  };

  constructor(private route: ActivatedRoute,
              private apiService: ApiService,
              private authService: AuthService,
              private helperService: HelpersService,
              private alertService: NotifierService,
              private messageService: MessageService,
              private router: Router) { }

  ngOnInit(): void {

  }

  public login() {

    this.clearErrorModel();

    if ( this.validateModel() ) {
      this.btnLoading = true;

      let form = {
        email: this.formModel.email,
        password: this.formModel.pass
      }

      this.apiService
        .userLogin(form)
        .subscribe({
          next: this.loginApiSuccess.bind(this),
          error: this.loginApiError.bind(this)
        });

    }

  }

  private getProfileData() {

    this.apiService
      .getProfileData(this.userId)
      .subscribe({
        next: this.getProfileDataSuccess.bind(this),
        error: this.getProfileDataError.bind(this),
      });

  }


  public register() {

    this.clearErrorModel();

    if ( this.validateModel('register') ) {

      this.btnLoading = true;

      const form = {
        'email': this.formModel.email,
        'password': this.formModel.pass,
        'roles': 'Reader'
      };

      this.apiService
        .userRegister(form)
        .subscribe({
          next: this.registerApiSuccess.bind(this),
          error: this.registerApiError.bind(this)
        });

    }

  }


  public openModal() {

    const redirect = this.route.snapshot.queryParamMap.get('redirect_link');

    if ( redirect && redirect.length > 0 ) {
      this.redirectLink = redirect;
    }

    this.setState('login');
    this.modalOpener.nativeElement.click();

  }


  public closeModel() {

    this.modalCloser.nativeElement.click();

  }

  public setState(state) {

    this.clearErrorModel();
    this.pageState = state;

  }

  private clearErrorModel() {

    this.errorModel = {
      name: '',
      pass: '',
      email: '',
      confirmpass: '',
      code: ''
    };

  }

  private validateModel(type = '') {

    let valid = true;
    const checkEmail = this.formModel.email.includes('@');

    if ( !this.formModel.email || this.formModel.email.length === 0 ) {

      valid = false;
      this.errorModel.email = 'تکمیل این فیلد الزامی است';

    }
    else if ( !checkEmail && type === 'register' ) {

      valid = false;
      this.errorModel.email = 'ایمیل را به شکل صحیح وارد کنید';

    }

    if ( !this.formModel.pass || this.formModel.pass.length === 0 ) {

      valid = false;
      this.errorModel.pass = 'تکمیل این فیلد الزامی است';

    } else if ( type === 'register' && (!this.formModel.confirmpass || this.formModel.confirmpass.length === 0)) {

      valid = false;
      this.errorModel.confirmpass = 'تکمیل این فیلد الزامی است';

    }
    // else if ( type === 'register' && (this.formModel.confirmpass == this.formModel.pass )) {
    //
    //   valid = false;
    //   this.errorModel.confirmpass = 'پسورد با تایید پسورد همخوانی ندارند';
    //
    // }
    return valid;

  }

  private redirectUser() {

    if ( this.redirectLink && this.redirectLink !== '' && this.redirectLink != null ) {

      this.router.navigateByUrl(this.redirectLink);

    }

  }

  private loginApiSuccess(response) {

    this.authService.setUserToken(response.access_token);
    this.authService.setUser(response['user']);
    // this.authService.setLogoutToken(response.logout_token);
    // this.userId = response.current_user.uid;

    this.closeModel();

    this.messageService.send('header', response);
    this.btnLoading = false;
    this.redirectUser();

  }

  private loginApiError(error) {

    if (  error.statusCode === 401 ) {

      this.errorModel.email = 'نام‌کاربری یا گذرواژه صحیح نیست';

    } else if ( error.statusCode === 404 ) {

      this.errorModel.email = 'کاربر مورد نظر وجود ندارد';

    } else {

      this.helperService.handleResponseError(error, this.errorModel, 'email');

    }

    this.btnLoading = false;

  }

  private registerApiSuccess(response) {


    this.alertService.notify('success', 'ثبت نام با موفقیت انجام شد.');

    this.setState('login');

    this.login();

    this.btnLoading = false;

  }

  private registerApiError(error) {


    this.btnLoading = false;
    if (  error.statusCode === 401 ) {

      this.errorModel.email = 'نام‌کاربری یا گذرواژه صحیح نیست';

    } else if ( error.statusCode === 404 ) {

      this.errorModel.email = 'کاربر مورد نظر وجود ندارد';

    } else {

      this.helperService.handleResponseError(error, this.errorModel, 'email');

    }

    this.btnLoading = false;

  }

  private getProfileDataSuccess(response) {

    this.userData = response;

    this.authService.setUser(response['user']);
    this.closeModel();

    this.messageService.send('header', response);
    this.redirectUser();
  }

  private getProfileDataError(error) {
    // console.log(error);
  }

}
