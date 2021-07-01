import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MetaService} from '../../services/meta.service';

@Component({
  selector: 'app-podcasts',
  templateUrl: './podcasts.component.html',
  styleUrls: ['./podcasts.component.scss'],
})
export class PodcastsComponent implements OnInit {

  public loading = false;

  public podcasts = [];

  public slug = '';

  constructor(private api: ApiService,
              private metaService: MetaService) { }

  public ngOnInit() {
    this.metaService.setTitle();
    this.metaService.clearMetaTags();

    this.loadPodcasts();
  }

  private loadPodcasts() {

    this.loading = true;

    this.api
      .loadAllPodcasts()
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
