import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import {MetaService} from '../../services/meta.service';
import { Track } from 'ngx-audio-player';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  public loading = false;

  public podcasts = [];

  public newest = [];
  public heroBG = '';

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

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay: true,
    navSpeed: 700,
    rtl: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 2
      },
      940: {
        items: 2
      }
    },
    nav: true
  };

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
    this.heroBG = response[0].field_podcast_image_export?.url;

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
