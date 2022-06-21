import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {ActivatedRoute} from '@angular/router';
import {NotifierService} from "angular-notifier";

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
    id: 0,
    title: null,
    content: '',
    createdAt: '',
    mainImageUrl: '',
    category: '',
    slug: ''
  };

  constructor(private api: ApiService,
              private alert: NotifierService,
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
      .loadAllBlogs(this.cat)
      .subscribe({
        next: this.onLoadRelatedPostSuccess.bind(this),
        error: this.onLoadRelatedPostError.bind(this)
      });
  }

  private makePostItem(data){

    this.blog = {
      id: data.id,
      title: data.title,
      content: data.content,
      createdAt: data.createdAt,
      mainImageUrl: data.mainImageUrl,
      category: data.category.title,
      slug: data.slug,
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
        url : this.categoryUrl + '/' + this.blog.id + this.blog.slug
      }
    ];
  }

  private onLoadPostSuccess(response) {

    this.loading = false;
    this.makePostItem(response);
  }


  private onLoadPostError(error) {
    this.loading = false;

    this.alert.notify('error',error.message)
  }

  private onLoadRelatedPostSuccess(response) {

    this.loading = false;
    this.related = response;

  }


  private onLoadRelatedPostError(error) {

    this.loading = false;
    this.alert.notify('error',error.message)
  }
}
