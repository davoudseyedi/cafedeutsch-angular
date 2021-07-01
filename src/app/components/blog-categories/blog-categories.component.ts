import {Component, OnChanges, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-blog-categories',
  templateUrl: './blog-categories.component.html',
  styleUrls: ['./blog-categories.component.scss']
})
export class BlogCategoriesComponent implements OnInit {

  public categories = [];

  constructor(private  api: ApiService) { }

  ngOnInit(): void {

    this.loadCategories();
  }

  private loadCategories() {

    this.api
      .getBlogCategoriesList()
      .subscribe({
        next: this.onLoadSuccess.bind(this),
        error: this.onLoadError.bind(this)
      });
  }

  private onLoadSuccess(response) {

    this.categories = response;
  }

  private onLoadError(error) {

    console.error(error);
  }

}
