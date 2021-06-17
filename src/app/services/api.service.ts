import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Config } from "./config";

@Injectable()

export class ApiService {

    public config = Config;

    constructor(private http: HttpClient) { }

    public loadCountries() {
        return this.http.get(this.config.COUNTRY_ALL);
    }

    public loadCountryByCode(code:string) {
        return this.http.get(this.config.COUNTRY_ALPHA_CODE + code);
    }

}

