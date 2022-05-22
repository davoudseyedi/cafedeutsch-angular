import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from './config';

@Injectable()

export class ApiService {

  public config = Config;

  constructor(private http: HttpClient) { }

  // Podcasts

  public loadAllPodcasts(category, season) {
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

  public loadAllBlogs(category) {
    return this.http.get(this.config.WEBSITE_ALL_BLOGS + '?category=' + category);
  }

  public loadAllBlogsWithSearch(search) {
    return this.http.get(this.config.WEBSITE_ALL_BLOGS + '?search=' + search );
  }

  public getRelatedBlogPosts(blogID) {
    return this.http.get(this.config.WEBSITE_ALL_BLOGS + '/' + blogID + '/related' );
  }


  public getPost(id) {
    return this.http.get(this.config.WEBSITE_ALL_BLOGS + '/' + id);
  }

  // Contact
  public postWebform(webform){
    return this.http.post(this.config.WEBSITE_WEBFORM, webform);
  }

  // BLOG TAXONOMIES LIST
  public getBlogCategoriesList(){
    return this.http.get(this.config.WEBSITE_BLOG_CATEGORY_LIST);
  }


  //Profile


  public userLogin(form) {

    const options = {
      headers: {
        'Content-type': 'application/json',
      }
    };

    return this.http.post(this.config.WEBSITE_AUTH_BASE_URL + '/login?_format=json', form, options);
  }

  public userRegister(form) {
    return this.http.post(this.config.WEBSITE_AUTH_BASE_URL + '/register?_format=json', form);
  }

  public logout(token, csrfToken) {
    const options = {
      headers: {
        'X-CSRF-Token': csrfToken,
        'Content-type': 'application/json',
      }
    };
    return this.http.post(this.config.WEBSITE_AUTH_BASE_URL + `/logout?_format=json&token=${token}`, null, options);
  }

  public getLoginStatus() {
    return this.http.get(this.config.WEBSITE_AUTH_BASE_URL + '/login_status?_format=json');
  }

  public getCsrfToken() {
    return this.http.get(this.config.SITE_URL + '/session/token', {responseType : 'text' as 'json'});
  }

  public getProfileData(id) {
    return this.http.get(this.config.WEBSITE_AUTH_BASE_URL + '/' + id + '?_format=json');
  }

  public updateProfileData(id,form) {
    return this.http.patch(this.config.WEBSITE_AUTH_BASE_URL + '/' + id + '?_format=json', form);
  }

  public addBookmark(form) {
    const options = {
      headers: {
        'Content-type': 'application/json',
      }
    };
    return this.http.post(this.config.WEBSITE_FLAGGING + '?_format=json', form,options);
  }

}

