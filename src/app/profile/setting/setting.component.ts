import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {AuthService} from "../../services/auth.service";
import {NotifierService} from "angular-notifier";
import {HelpersService} from "../../services/helpers.service";

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  public btnLoading = false;
  public loading = false;

  public userId = 0;

  public accountModel = {
    username : '',
    mail: '',
    password: '',
    current_password: ''
  }

  public userModel = {
    field_first_name: '',
    field_last_name: '',
    field_phone_number: ''
  }

  public userModelError = {
    username: '',
    mail: '',
    password: '',
    current_password: '',
    field_first_name: '',
    field_last_name: '',
    field_phone_number: ''
  }

  constructor(private apiService: ApiService,
              private authService: AuthService,
              private helperService: HelpersService,
              private alertService: NotifierService) { }

  ngOnInit(): void {


    this.userId = this.authService.getUser()['uid'][0].value;


    this.getProfile();
  }


  public getProfile(){

    this.loading = true;
    this.btnLoading = true;

    this.apiService.getProfileData(this.userId).subscribe({
      next: this.getProfileSuccess.bind(this),
      error: this.getProfileError.bind(this)
    })

  }


  public updateUser(){

    if(this.accountModel.current_password){

      this.loading = true;
      this.btnLoading = true;

      const form = {
        'name': { value: this.accountModel.username },
        'mail': { value: this.accountModel.mail },
        'pass': [
          {
            value: this.accountModel.password,
            existing: this.accountModel.current_password
          }
        ],
        'field_first_name': { value: this.userModel.field_first_name },
        'field_last_name': { value: this.userModel.field_last_name },
        'field_phone_number': { value: this.userModel.field_phone_number },
      };

      this.apiService.updateProfileData(this.userId,form).subscribe({
        next: this.updateProfileSuccess.bind(this),
        error: this.updateProfileError.bind(this)
      })

    }else{

      this.loading = false;
      this.btnLoading = false;

      this.alertService.notify('warning','برای ویرایش، گذرواژه فعلی الزامی است.')
    }

  }

  private updateProfileSuccess(response){

    this.loading = false;
    this.btnLoading = false;

    this.alertService.notify('success','بروزرسانی پروفایل با موفقیت انجام شد');
    this.getProfile();
  }

  private updateProfileError(error){

    this.loading = false;
    this.btnLoading = false;

    if(error.code == 422){
      this.helperService.handleResponseError(error,this.userModelError,'username')
    }else{
      this.alertService.notify('error','بروزرسانی پروفایل با خطا مواجه شد')
    }


  }

  private getProfileSuccess(response){

    this.loading = false;
    this.btnLoading = false;

    this.accountModel = {
      username: response['name'][0]?.value,
      mail: response['mail'][0]?.value,
      password: '',
      current_password: ''
    }

    this.userModel = {
      field_first_name: response['field_first_name'][0]?.value,
      field_last_name: response['field_last_name'][0]?.value,
      field_phone_number: response['field_phone_number'][0]?.value
    }
  }

  private getProfileError(error){

    this.loading = false;
    this.btnLoading = false;

    this.alertService.notify('error','دریافت پروفایل با خطا مواجه شد')


  }

}
