import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {AuthService} from "../../services/auth.service";
import {NotifierService} from "angular-notifier";
import {HelpersService} from "../../services/helpers.service";
import {Local} from "protractor/built/driverProviders";
import {LocalStorageService} from "../../services/local-storage.service";
import {Language} from "../../services/language";
import {MetaService} from "../../services/meta.service";

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  public btnLoading = false;
  public loading = false;

  public userId;

  public userModel = {
    email: '',
    password: '',
    current_password: '',
    first_name: '',
    last_name: '',
    mobile_number: ''
  }

  public userModelError = {
    email: '',
    password: '',
    current_password: '',
    first_name: '',
    last_name: '',
    mobile_number: ''
  }

  constructor(private apiService: ApiService,
              private localStorage: LocalStorageService,
              private helperService: HelpersService,
              private metaService: MetaService,
              private alertService: NotifierService) {

  }

  ngOnInit(): void {


    this.metaService.setTitle(Language.getTitle('SETTING'));
    this.metaService.setDescription(Language.getDescription('SETTING'));

    this.userId = parseInt(this.localStorage.getItem('user-data')['id']);

    if(this.userId){
      this.getProfile();
    }


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

    if(this.userModel.current_password){

      this.loading = true;
      this.btnLoading = true;

      const form = {
        'email': this.userModel.email,
        'password': this.userModel.password,
        'first_name': this.userModel.first_name,
        'last_name': this.userModel.last_name,
        'mobile_number': this.userModel.mobile_number,
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

    if(error.statusCode == 422){
      this.helperService.handleResponseError(error,this.userModelError,'email')
    }else{
      this.alertService.notify('error','بروزرسانی پروفایل با خطا مواجه شد')
    }


  }

  private getProfileSuccess(response){

    this.loading = false;
    this.btnLoading = false;

    this.userModel = {
      email: response['email'],
      password: response['password'],
      current_password: '',
      first_name: response['first_name'],
      last_name: response['last_name'],
      mobile_number: response['mobile_number']
    }
  }

  private getProfileError(error){

    this.loading = false;
    this.btnLoading = false;

    this.alertService.notify('error','دریافت پروفایل با خطا مواجه شد')


  }

}
