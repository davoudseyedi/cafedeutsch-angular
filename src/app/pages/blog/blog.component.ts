import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MetaService} from '../../services/meta.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  public loading = false;

  public blogs = [];

  constructor(private api: ApiService,
              private metaService: MetaService) { }

  public ngOnInit() {
    this.metaService.setTitle();
    this.metaService.clearMetaTags();

    this.loadBlogs();
  }

  private loadBlogs() {

    this.loading = true;

    this.api
      .loadAllBlogs()
      .subscribe({
        next: this.onLoadBlogsSuccess.bind(this),
        error: this.onLoadBlogsError.bind(this)
      });
  }

  private onLoadBlogsSuccess(response) {
    this.loading = false;
    this.blogs = response;
  }

  private onLoadBlogsError(error) {
    this.loading = false;
    console.error(error);
  }



}
