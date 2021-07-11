import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MetaService} from '../../services/meta.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-podcasts-category',
  templateUrl: './podcasts-category.component.html',
  styleUrls: ['./podcasts-category.component.scss']
})
export class PodcastsCategoryComponent implements OnInit {

  public loading = false;
  public podcasts = [];

  public categoryLabel = '';
  public cat = '';
  public season = 'all';
  public categoryUrl = '';

  public id;

  public breadcrumb = [];

  constructor(private api: ApiService,
              private metaService: MetaService,
              private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.metaService.setTitle();
    this.metaService.clearMetaTags();

    this.route.paramMap.subscribe(event => {

      if ( event.get('cat') ) {

        this.cat = event.get('cat');

        this.categoryUrl = '/podcasts/' + this.cat;
        this.breadcrumb = [
          {
            name: 'اپیزود ها',
            url: '/podcasts',
          },
          {
            name : this.categoryLabel,
            url : this.categoryUrl
          }
        ];

      }
      this.loadPodcastsCategory();

    });


  }

  private loadPodcastsCategory() {

    this.loading = true;

    this.api
      .loadAllPodcasts(this.cat, this.season)
      .subscribe({
        next: this.onLoadPodcastsSuccess.bind(this),
        error: this.onLoadPodcastsError.bind(this)
      });
  }

  private onLoadPodcastsSuccess(response) {
    this.loading = false;
    this.podcasts = response;

    this.categoryLabel = 'سطح ' + response[0].field_podcast_category_export.name;

    this.breadcrumb = [
      {
        name: 'اپیزود ها',
        url: '/podcasts',
      },
      {
        name : this.categoryLabel,
        url : this.categoryUrl
      }
    ];
  }

  private onLoadPodcastsError(error) {
    this.loading = false;
    console.error(error);
  }

}
