import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MetaService} from '../../services/meta.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotifierService} from "angular-notifier";
import {Language} from "../../services/language";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  public loading = false;

  public cat = '';
  public search = '';

  public breadcrumb = [
    {
      name: 'خانه',
      url: '/'
    },
    {
      name: 'بلاگ',
      url: '/blog'
    }
  ];

  public blogs = [];

  constructor(private api: ApiService,
              private metaService: MetaService,
              private router: Router,
              private alert: NotifierService,
              private route: ActivatedRoute) { }

  public ngOnInit() {
    this.metaService.setTitle(Language.getTitle('POSTS'));
    this.metaService.setDescription(Language.getDescription('POSTS'));

    this.route.queryParamMap.subscribe(params => {

      if (params.get('search')){
        this.search = params.get('search');
      }

    });

    this.route.paramMap.subscribe(event => {

      if (event.get('category')){
        this.cat = event.get('category');
      }

      this.loadBlogs();

    });




  }

  public searchPost(){
    this.router.navigateByUrl('/blog?search=' + this.search );


    this.loading = true;
    this.api
      .loadAllBlogsWithSearch(this.search)
      .subscribe({
        next: this.onLoadBlogsSuccess.bind(this),
        error: this.onLoadBlogsError.bind(this)
      });
  }

  private loadBlogs() {

    this.loading = true;

    this.api
      .loadAllBlogs(this.cat)
      .subscribe({
        next: this.onLoadBlogsSuccess.bind(this),
        error: this.onLoadBlogsError.bind(this)
      });
  }

  private onLoadBlogsSuccess(response) {
    this.loading = false;
    this.blogs = response.items;
  }

  private onLoadBlogsError(error) {
    this.loading = false;
    this.alert.notify('error',error.message)
  }



}
