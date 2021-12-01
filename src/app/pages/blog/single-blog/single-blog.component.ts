import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.scss']
})
export class SingleBlogComponent implements OnInit {

  public loading = false;

  public cat = '';
  public slug = '';
  public name;
  public categoryUrl;

  public related = [];

  public id;

  public breadcrumb = [];

  public blog = {
    nid: 0,
    title: null,
    body: '',
    created: '',
    image: '',
    category: '',
    slug: '',
    term_slug: ''
  };

  constructor(private api: ApiService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(event => {

     if (event.get('id')){
       this.id = event.get('id');
     }

     if (event.get('cat')){
       this.cat = event.get('cat');

       this.categoryUrl = '/blog/' + this.cat;
       this.breadcrumb = [
         {
           name: 'بلاگ',
           url: '/blog',
         },
         {
           name : this.blog.category,
           url : this.categoryUrl
         }
       ];
     }

     this.loadSinglePost();

     this.loadRelated();

    });
  }

  public loadSinglePost(){
    this.loading = true;

    this.api
      .getPost(this.id)
      .subscribe({
        next: this.onLoadPostSuccess.bind(this),
        error: this.onLoadPostError.bind(this)
      });
  }

  public loadRelated(){
    this.loading = true;

    this.api
      .getRelatedBlogPosts(this.id)
      .subscribe({
        next: this.onLoadRelatedPostSuccess.bind(this),
        error: this.onLoadRelatedPostError.bind(this)
      });
  }

  private makePostItem(data){

    this.blog = {
      nid: data[0].nid,
      title: data[0].title,
      body: data[0].body,
      created: data[0].created,
      image: data[0].field_image_export.url,
      category: data[0].field_blog_category_export.name,
      slug: data[0].slug,
      term_slug: data[0].term_slug
    };


    this.breadcrumb = [
      {
        name: 'بلاگ',
        url: '/blog',
      },
      {
        name : this.blog.category,
        url : this.categoryUrl
      },
      {
        name : this.blog.title,
        url : this.categoryUrl + '/' + this.blog.nid + this.blog.slug
      }
    ];
  }

  private onLoadPostSuccess(response) {

    this.loading = false;
    this.makePostItem(response);
  }


  private onLoadPostError(error) {
    this.loading = false;

    console.error(error);
  }

  private onLoadRelatedPostSuccess(response) {

    this.loading = false;
    this.related = response;

  }


  private onLoadRelatedPostError(error) {

    this.loading = false;
    console.error(error);
  }
}
