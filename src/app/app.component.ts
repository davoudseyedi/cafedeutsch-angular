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

    constructor(private router: Router,
                private metaService: MetaService) {
        router.events.subscribe((path) => {
            if ( path instanceof NavigationEnd ) {
                let pathUrl = path.url;
                this.metaService.setCanonical(pathUrl);
                this.metaService.clearOgTags(pathUrl);
            }
        });
    }

}
