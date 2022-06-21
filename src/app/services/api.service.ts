import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from './config';

@Injectable()

export class ApiService {

  public config = Config;

  constructor(private http: HttpClient) { }

  // Podcasts

  public loadAllPodcasts(category = '', season = '') {
    return this.http.get(this.config.WEBSITE_ALL_PODCASTS + '?category=' + category + '&season=' + season);
  }

  public loadRelatedPodcasts(seasonID, catID) {
    return this.http.get(this.config.WEBSITE_ALL_PODCASTS + '/related/' + seasonID + '/' + catID);
  }

  public loadFeaturedPodcasts() {
    return this.http.get(this.config.WEBSITE_FEATURED_PODCASTS);
  }

  public loadPromotedPodcasts() {
    return this.http.get(this.config.WEBSITE_PROMOTED_PODCASTS);
  }

  public getPodcast(id) {
    return this.http.get(this.config.WEBSITE_ALL_PODCASTS + '/' + id);
  }


  // Blog

  public loadAllBlogs(category = '') {
    return this.http.get(this.config.WEBSITE_ALL_BLOGS + '?category=' + category);
  }

  public loadAllBlogsWithSearch(search) {
    return this.http.get(this.config.WEBSITE_ALL_BLOGS + '?title=' + search );
  }

  public getPost(id) {
    return this.http.get(this.config.WEBSITE_ALL_BLOGS + '/' + id);
  }

  // Contact
  public postWebform(webform){
    return this.http.post(this.config.WEBSITE_CONTACT, webform);
  }

  // Category LIST
  public getCategoriesList(){
    return this.http.get(this.config.WEBSITE_ALL_CATEGORY);
  }


  //Profile


  public userLogin(form) {

    return this.http.post(this.config.WEBSITE_AUTH_BASE_URL + '/login', form);
  }

  public userRegister(form) {
    return this.http.post(this.config.WEBSITE_AUTH_BASE_URL + '/register', form);
  }

  public logout() {
    return this.http.post(this.config.WEBSITE_AUTH_BASE_URL + '/logout', {});
  }

  public getProfileData(id) {
    return this.http.get(this.config.WEBSITE_AUTH_BASE_URL + '/profile/' + id);
  }

  public updateProfileData(id,form) {
    return this.http.patch(this.config.WEBSITE_AUTH_BASE_URL + '/profile/' + id , form);
  }

}

