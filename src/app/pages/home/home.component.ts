import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import {MetaService} from '../../services/meta.service';
import { Track } from 'ngx-audio-player';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  public loading = false;

  public podcasts = [];

  public newest = [];

  public displayVolumeControls = true;
  public displayRepeatControls = true;
  public displayDuration = true;
  public disablePositionSlider = false;
  public playlist: Track[] = [
    {
      title: '',
      link: '',
      artist: '',
      // duration: ''
    }

  ];

  constructor(private api: ApiService,
              private metaService: MetaService) { }

  public ngOnInit() {
    this.metaService.setTitle();
    this.metaService.clearMetaTags();

    this.loadNewestPodcast();
    this.loadPodcasts();
  }

  private loadNewestPodcast(){
    this.loading = true;

    this.api
      .loadPromotedPodcasts()
      .subscribe({
        next: this.onLoadNewestPodcastsSuccess.bind(this),
        error: this.onLoadNewestPodcastsError.bind(this)
      });
  }

  private loadPodcasts() {

    this.loading = true;

    this.api
      .loadFeaturedPodcasts()
      .subscribe({
        next: this.onLoadPodcastsSuccess.bind(this),
        error: this.onLoadPodcastsError.bind(this)
      });
  }

  private onLoadNewestPodcastsSuccess(response) {
    this.loading = false;
    this.newest = response;

    this.playlist = [{
      title: response[0].title,
      link: 'https://core.cafedeutsch.net' + response[0].audio,
      artist: 'داود سیدی'
    }];
  }

  private onLoadNewestPodcastsError(error) {
    this.loading = false;
    console.error(error);
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
