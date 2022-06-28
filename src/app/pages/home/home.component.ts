import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MetaService} from '../../services/meta.service';
import {Track} from 'ngx-audio-player';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {NotifierService} from "angular-notifier";
import {Language} from "../../services/language";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit {

  public loading = false;

  public podcasts = [];
  public blog = [];

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
    dots: true,
    autoplay: true,
    navSpeed: 700,
    rtl: true,
    navText: ['<i class="fa fa-arrow-alt-circle-right"></i>', '<i class="fa fa-arrow-alt-circle-left"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: true
  };

  blogOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplay: true,
    navSpeed: 700,
    rtl: true,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
    navText: ['<i class="fa fa-arrow-alt-circle-right"></i>', '<i class="fa fa-arrow-alt-circle-left"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  };

  constructor(private api: ApiService,
              private alert: NotifierService,
              private metaService: MetaService) { }

  public ngOnInit() {
    this.metaService.setTitle(Language.getTitle('HOME'));
    this.metaService.setDescription(Language.getDescription('HOME'));

    this.loadPodcasts();
    this.loadBlogs();
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

  private loadBlogs() {

    this.loading = true;

    this.api
      .loadAllBlogs()
      .subscribe({
        next: this.onLoadBlogsSuccess.bind(this),
        error: this.onLoadBlogsError.bind(this)
      });
  }


  private onLoadPodcastsSuccess(response) {
    this.loading = false;
    this.podcasts = response;

    this.newest = response;
    this.heroBG = response[0].episodeImage;

    this.playlist = [{
      title: response[0].title,
      link: response[0].episodeAudioFile,
      artist: 'داود سیدی'
    }];
  }

  private onLoadPodcastsError(error) {
    this.loading = false;
    this.alert.notify('error',error.message)
  }

  private onLoadBlogsSuccess(response) {
    this.loading = false;
    this.blog = response;
  }

  private onLoadBlogsError(error) {
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
