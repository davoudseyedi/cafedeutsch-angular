import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {MetaService} from '../../../services/meta.service';
import {ActivatedRoute} from '@angular/router';
import {NotifierService} from "angular-notifier";
import {Language} from "../../../services/language";

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
  public season = '';
  public categoryUrl = '';

  public id;

  public breadcrumb = [];

  constructor(private api: ApiService,
              private metaService: MetaService,
              private alert: NotifierService,
              private route: ActivatedRoute) { }


  ngOnInit(): void {

    this.metaService.setDescription(Language.getDescription('PODCAST_CATEGORY'));

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


    });

    this.route.queryParamMap.subscribe(params => {

      if (params.get('season')){
        this.season = params.get('season');
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
    this.podcasts = response.items;

    this.categoryLabel = 'سطح ' + response.items[0].category?.title;

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

    this.metaService.setTitle(Language.getTitle('SINGLE_EPISODE').replace('{{var}}',response.items[0].category?.title))

  }

  private onLoadPodcastsError(error) {
    this.loading = false;
    this.alert.notify('error',error.message)
  }

  public checkPublishDate(date: string | null){
    const now = new Date().getTime();
    const pDate = new Date(date).getTime();
    if (pDate && pDate > now){
      return pDate;
    }
  }

}
