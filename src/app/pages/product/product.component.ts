import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {MetaService} from "../../services/meta.service";

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit {

    public productId:string = null;
    public product:any = null;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private metaService: MetaService,
                private service: ApiService) { }

    public ngOnInit() {
        this.productId = this.route.snapshot.paramMap.get('id');
        this.loadCountry();
    }

    private loadCountry() {
        this.service
            .loadCountryByCode(this.productId)
            .subscribe({
                next: this.onLoadDataSuccess.bind(this),
                error: this.onLoadDataError.bind(this),
            });
    }

    private onLoadDataSuccess(response) {
        this.product = response;
        this.metaService.setTitle(this.product.name);
        console.log(response);
    }

    private onLoadDataError(error) {
        console.error('Error: ', error);
        this.router.navigateByUrl('/');
    }

}
