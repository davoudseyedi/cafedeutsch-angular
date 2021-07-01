import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MetaService} from '../../services/meta.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-blog-category',
  templateUrl: './blog-category.component.html',
  styleUrls: ['./blog-category.component.scss']
})
export class BlogCategoryComponent implements OnInit {

  public loading = false;
  public blog = [];

  public categoryLabel = '';

  public id;

  constructor(private api: ApiService,
              private metaService: MetaService,
              private route: ActivatedRoute) { }


  ngOnInit(): void {

    this.metaService.setTitle();
    this.metaService.clearMetaTags();

    this.route.paramMap.subscribe(event => {
      this.id = event.get('id');

    });

    this.loadBlogCategory();

  }

  private loadBlogCategory() {

    this.loading = true;

    this.api
      .getBlogOfCategory(this.id)
      .subscribe({
        next: this.onLoadBlogSuccess.bind(this),
        error: this.onLoadBlogError.bind(this)
      });
  }

  private onLoadBlogSuccess(response) {
    this.loading = false;
    this.blog = response;

    this.categoryLabel = response[0].field_blog_category;

  }

  private onLoadBlogError(error) {
    this.loading = false;
    console.error(error);
  }

}