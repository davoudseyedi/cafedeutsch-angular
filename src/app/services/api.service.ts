import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Config } from "./config";

@Injectable()

export class ApiService {

  public config = Config;

  constructor(private http: HttpClient) { }

  //Podcasts

  public loadAllPodcasts() {
    return this.http.get(this.config.WEBSITE_ALL_PODCASTS);
  }

  public loadFeaturedPodcasts() {
    return this.http.get(this.config.WEBSITE_FEATURED_PODCASTS);
  }

  public getPodcast(id) {
    return this.http.get(this.config.WEBSITE_ALL_PODCASTS + '/' + id);
  }


  //Blog

  public loadAllBlogs() {
    return this.http.get(this.config.WEBSITE_ALL_BLOGS);
  }


  public getPost(id) {
    return this.http.get(this.config.WEBSITE_ALL_BLOGS + '/' + id);
  }

  //Contact
  public postWebform(webform){
    return this.http.post(this.config.WEBSITE_WEBFORM,webform);
  }

}

