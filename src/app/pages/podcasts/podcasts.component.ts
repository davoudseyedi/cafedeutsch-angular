import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MetaService} from '../../services/meta.service';
import {ActivatedRoute} from '@angular/router';
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-podcasts',
  templateUrl: './podcasts.component.html',
  styleUrls: ['./podcasts.component.scss'],
})
export class PodcastsComponent implements OnInit {

  public loading = false;

  public cat = '';
  public season = '';

  public breadcrumb = [
    {
      name: 'خانه',
      url: '/'
    },
    {
      name: 'اپیزود ها',
      url: '/podcasts'
    }
  ];


  public podcasts = [];

  public slug = '';

  constructor(private api: ApiService,
              private metaService: MetaService,
              private alert: NotifierService,
              private route: ActivatedRoute) { }

  public ngOnInit() {
    this.metaService.setTitle();
    this.metaService.clearMetaTags();

    this.route.queryParamMap.subscribe(params => {

      if (params.get('category')){
        this.cat = params.get('category');
      }

      if (params.get('season')){
        this.season = params.get('season');
      }
      this.loadPodcasts();

    });


  }

  private loadPodcasts() {

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
