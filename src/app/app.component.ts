import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MetaService } from './services/meta.service';

@Component({
    selector: 'app-root',
    styles: [`
        .content-wrapper {
            min-height: 70vh;
        }
    `],
    templateUrl: './app.component.html'
})
export class AppComponent {


  public hideHeader = false;

    constructor(private router: Router,
                private metaService: MetaService) {


        router.events.subscribe((path) => {
            if ( path instanceof NavigationEnd ) {
                let pathUrl = path.url;
                this.metaService.setCanonical(pathUrl);
                this.metaService.clearOgTags(pathUrl);

              // if ( pathUrl.indexOf('/h-admin') > -1 || pathUrl.indexOf('/500') > -1  || pathUrl.indexOf('/maintenance') > -1 ) {
              //
              //   this.hideHeader = false;
              //
              // } else {
              //
                this.hideHeader = true;
              //
              // }
            }
        });


    }

}
