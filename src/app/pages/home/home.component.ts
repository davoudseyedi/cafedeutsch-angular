import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import {MetaService} from "../../services/meta.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

    public countries:any[] = [];

    constructor(private service: ApiService,
                private metaService: MetaService) { }

    public ngOnInit() {
        this.metaService.setTitle();
        this.metaService.clearMetaTags();
        this.loadCountries();
    }

    private loadCountries() {
        this.service
            .loadCountries()
            .subscribe({
                next: this.onLoadCountriesSuccess.bind(this),
                error: this.onLoadCountriesError.bind(this)
            });
    }

    private onLoadCountriesSuccess(response) {
        console.log(response);
        this.countries = response ? response.splice(0, 10) : [];
    }

    private onLoadCountriesError(error) {
        console.error('Error: ');
        console.error(error);
    }
}
