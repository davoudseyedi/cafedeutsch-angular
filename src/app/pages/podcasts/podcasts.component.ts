import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MetaService} from '../../services/meta.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-podcasts',
  templateUrl: './podcasts.component.html',
  styleUrls: ['./podcasts.component.scss'],
})
export class PodcastsComponent implements OnInit {

  public loading = false;

  public cat = 'all';
  public season = 'all';

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
              private route: ActivatedRoute) { }

  public ngOnInit() {
    this.metaService.setTitle();
    this.metaService.clearMetaTags();

    this.route.paramMap.subscribe(event => {

      if (event.get('category')){
        this.cat = event.get('category');
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
    console.error(error);
  }

}
