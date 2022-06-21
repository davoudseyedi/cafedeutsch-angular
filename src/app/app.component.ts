import {Component, Inject, PLATFORM_ID, ViewChild} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MetaService } from './services/meta.service';
import {LoginModalComponent} from './components/login-modal/login-modal.component';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import {Subscription} from 'rxjs';
import {MessageService} from './services/message.service';
import {AuthService} from './services/auth.service';
import {ApiService} from './services/api.service';
import {LocalStorageService} from './services/local-storage.service';
import {Config} from './services/config';
import {isPlatformBrowser} from '@angular/common';
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-root',
  styles: [`
    .content-wrapper {
      min-height: 70vh;
    }
    @media(max-width: 667px){
      .content-wrapper{
        margin-bottom: 5rem;
      }
    }
  `],
  templateUrl: './app.component.html'
})
export class AppComponent {

  @ViewChild(LoginModalComponent, {static: true}) public accountModal: LoginModalComponent;
  @ViewChild(ToastContainerDirective, { static: false }) toastContainer: ToastContainerDirective;

  public userId = parseInt(this.localStorage.getItem('user-data')['id']);

  public hideHeader = false;

  public listener: Subscription;

  public link = '';

  public isProfile = false;

  constructor(private router: Router,
              private messageService: MessageService,
              @Inject(PLATFORM_ID) private platformId: Object,
              private toastrService: ToastrService,
              private authService: AuthService,
              private alert: NotifierService,
              private apiService: ApiService,
              private localStorage: LocalStorageService,
              private metaService: MetaService) {

    if ( !!this.authService.getUserToken()) {
      this.getProfileData();
    }

    router.events.subscribe((path) => {
      if ( path instanceof NavigationEnd ) {
        const pathUrl = path.url;
        this.metaService.setCanonical(pathUrl);
        this.metaService.setMetaCustomTag('keywords', Config.DEFAULT_META_KEYWORDS);

        this.metaService.clearOgTags(pathUrl);

        if (  pathUrl.indexOf('/500') === 0  || pathUrl.indexOf('/maintenance') > -1 ) {

          this.hideHeader = false;

        } else {

          this.hideHeader = true;

        }

        if ( isPlatformBrowser(this.platformId) ) {

          window.scrollTo(0, 0);

        }

        if ( path.url.indexOf('profile') > -1 ) {

          this.isProfile = true;

        }else{
          this.isProfile = false;
        }
      }
    });

    this.listener =  this.messageService.get()
      .subscribe(message => {

        if ( message.key === 'login' ) {

          if ( message.value && message.value !== '' ) {

            this.link = message.value;

          } else {

            this.link = '';

          }

          this.openAccountModal();

        }

      });


  }

  ngOnInit() {

    this.toastrService.overlayContainer = this.toastContainer;

  }

  private openAccountModal() {

    this.accountModal.openModal();

  }

  private getProfileData() {

    this.apiService
      .getProfileData(this.userId)
      .subscribe({
        next: this.getProfileDataSuccess.bind(this),
        error: this.getProfileDataError.bind(this),
      });

  }

  private getProfileDataSuccess(response) {

    this.authService.setUser(response);
  }

  private getProfileDataError(error) {
    // console.log(error);
  }

}
