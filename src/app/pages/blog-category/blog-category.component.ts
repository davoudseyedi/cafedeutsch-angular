import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MetaService} from '../../services/meta.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HelpersService} from '../../services/helpers.service';

@Component({
  selector: 'app-blog-category',
  templateUrl: './blog-category.component.html',
  styleUrls: ['./blog-category.component.scss']
})
export class BlogCategoryComponent implements OnInit {

  public loading = false;
  public blog = [];

  public categoryLabel = '';

  public cat = '';
  public season = 'all';
  public search = '';
  public category_url;

  public id;

  public breadcrumb = [];

  constructor(private api: ApiService,
              private metaService: MetaService,
              private router: Router,
              private helpersService: HelpersService,
              private route: ActivatedRoute) { }


  ngOnInit(): void {

    this.metaService.setTitle();
    this.metaService.clearMetaTags();

    this.route.queryParamMap.subscribe(params => {

      if (params.get('season')){
        this.season = params.get('season');
      }
      if (params.get('search')){
        this.search = params.get('search');
      }

    });


    this.route.paramMap.subscribe(event => {

      if ( event.get('cat') ) {

        this.cat = event.get('cat');

        this.category_url = '/blog/' + this.cat;
        this.breadcrumb = [
          {
            name: 'بلاگ',
            url: '/blog',
          },
          {
            name : this.categoryLabel,
            url : this.category_url
          }
        ];

        this.loadBlogCategory();

      }
    });


  }

  public searchPost(){

    this.helpersService.changeRouteParams('/blog' , {search: this.search} );

    this.loading = true;
    this.api
      .loadAllBlogsWithSearch(this.search)
      .subscribe({
        next: this.onLoadBlogSuccess.bind(this),
        error: this.onLoadBlogError.bind(this)
      });
  }

  private loadBlogCategory() {

    this.loading = true;

    this.api
      .loadAllBlogs(this.cat)
      .subscribe({
        next: this.onLoadBlogSuccess.bind(this),
        error: this.onLoadBlogError.bind(this)
      });
  }

  private onLoadBlogSuccess(response) {
    this.loading = false;
    this.blog = response;

    this.categoryLabel = response[0]?.field_blog_category_export.name;

    this.breadcrumb = [
      {
        name: 'بلاگ',
        url: '/blog',
      },
      {
        name : this.categoryLabel,
        url : this.category_url
      }
    ];

  }

  private onLoadBlogError(error) {
    this.loading = false;
    console.error(error);
  }

}
