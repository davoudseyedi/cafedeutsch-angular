import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-profile-main',
  styles: [`
            .profile-wrapper {
                min-height: 80vh;
                margin-top: 89px;
            }
            @media (max-width: 667px){
                .profile-wrapper{
                    margin-top: 59px;
                }
            }
        `],
  template: `
        <div class="profile-wrapper container">
            <div class="row">
                <div class="col-12 col-lg-3" *ngIf="!hideSidebar">
                    <app-profile-sidebar></app-profile-sidebar>
                </div>
                <div class="col-12" [class.col-lg-9]="!hideSidebar">
                    <router-outlet></router-outlet>
                </div>
            </div>
        </div>
    `
})

/**
 * Class ProfileMainComponent
 */
export class ProfileMainComponent {

  public loading = true;

  public hideSidebarList = [];
  public excludeSidebarList = [];
  public hideSidebar = false;
  // public fullwith = false;

  constructor( @Inject(PLATFORM_ID) private platformId: Object,
               private router: Router ) {

    router.events.subscribe((path) => {
      if ( path instanceof NavigationEnd ) {

        this.hideSidebar = false;

        for ( const item of this.hideSidebarList ) {

          if ( path.url.indexOf(item) > -1 ) {

            this.hideSidebar = true;
            // this.fullwith = true;
            break;

          }

        }

        for ( const item of this.excludeSidebarList ) {

          if ( path.url.indexOf(item) > -1 ) {

            this.hideSidebar = false;
            break;

          }

        }

      }
    });

  }

  public ngOnInit() {

  }

}
