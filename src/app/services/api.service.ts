import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Config } from "./config";

@Injectable()

export class ApiService {

    public config = Config;

    constructor(private http: HttpClient) { }

    public loadPodcasts() {
        return this.http.get(this.config.WEBSITE_PODCASTS);
    }


}

