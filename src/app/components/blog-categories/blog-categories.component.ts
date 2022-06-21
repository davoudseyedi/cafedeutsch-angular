import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-blog-categories',
  templateUrl: './blog-categories.component.html',
  styleUrls: ['./blog-categories.component.scss']
})
export class BlogCategoriesComponent implements OnInit {

  public categories = [];
  @Input() sticky = false;

  constructor(private  api: ApiService) { }

  ngOnInit(): void {

    this.loadCategories();
  }

  private loadCategories() {

    this.api
      .getCategoriesList()
      .subscribe({
        next: this.onLoadSuccess.bind(this),
        error: this.onLoadError.bind(this)
      });
  }

  private onLoadSuccess(response) {

    for (let item of response){
      if(item && item.slug.indexOf('blog_category') > -1){
        this.categories = item.children;
      }
    }
  }

  private onLoadError(error) {

    console.error(error);
  }

}
