import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {ActivatedRoute} from '@angular/router';
import {Track} from 'ngx-audio-player';
import {NotifierService} from "angular-notifier";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-single-podcast',
  templateUrl: './single-podcast.component.html',
  styleUrls: ['./single-podcast.component.scss'],
})
export class SinglePodcastComponent implements OnInit {

  public loading = false;
  public isFlagged = false;

  public userId = 0;

  public displayVolumeControls = true;
  public disablePositionSlider = false;

  public playlist: Track[] = [
    {
      title: '',
      link: '',
      artist: '',
      // duration: ''
    }

  ];

  public cat = '';
  public slug = '';
  public name;
  public categoryUrl;

  public podcast = {
    id: 0,
    title: null,
    description: '',
    createdAt: '',
    publish_date: null,
    episodeImage: '',
    category: '',
    season: '',
    episodeAudioFile: '',
    slug: '',
    tag: [],
    user: ''
  };

  public publishDate;

  public category = '';
  public season = '';

  public podcasts = [];

  public id;

  public breadcrumb = [];

  constructor(private api: ApiService,
              private notify: NotifierService,
              private authService:AuthService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(event => {

      if (event.get('id')){
        this.id = event.get('id');

      }

      if (event.get('cat')){
        this.cat = event.get('cat');

        this.categoryUrl = '/podcasts/' + this.cat;
        this.breadcrumb = [
          {
            name: 'اپیزودها',
            url: '/podcasts',
          },
          {
            name : this.podcast.category['title'],
            url : this.categoryUrl
          }
        ];
      }

      this.loadSinglePodcast();


    });
  }

  public loadSinglePodcast(){

    this.loading = true;

    this.api
      .getPodcast(this.id)
      .subscribe({
        next: this.onLoadPodcastSuccess.bind(this),
        error: this.onLoadPodcastError.bind(this)
      });
  }

  public loadRelatedEpisodes(){

    this.loading = true;

    this.api
      .loadAllPodcasts(this.category, this.season)
      .subscribe({
        next: this.onLoadRelatedPodcastSuccess.bind(this),
        error: this.onLoadRelatedPodcastError.bind(this)
      });
  }

  private makePodcastItem(data){

    this.loading = false;

    this.podcast = {
      id: data.id,
      title: data.title,
      description: data.description,
      createdAt: data.createdAt,
      episodeImage: data.episodeImage,
      category: data.category['title'],
      publish_date: data.publish_date,
      season: data.season['title'],
      episodeAudioFile: data.episodeAudioFile,
      slug: data.slug,
      tag: data.tag,
      user: data.user
    };

    this.publishDate = new Date(data.publish_date).getTime();

    this.category = data.category.slug;
    this.season = data.season.slug;

    this.playlist = [{
      title: this.podcast.title,
      link: this.podcast.episodeAudioFile,
      artist: 'داود سیدی'
    }];

    this.breadcrumb = [
      {
        name: 'اپیزود ها',
        url: '/podcasts',
      },
      {
        name : this.podcast.category,
        url : this.categoryUrl
      },
      {
        name : this.podcast.title,
        url : this.categoryUrl + '/' + this.podcast.id + this.podcast.slug
      }
    ];
  }
  private onLoadPodcastSuccess(response) {

    this.makePodcastItem(response);
    this.loadRelatedEpisodes();

  }

  private onLoadPodcastError(error) {
    this.loading = false;
    this.notify.notify('error',error.message)
  }

  private onLoadRelatedPodcastSuccess(response) {

    this.loading = false;
    this.podcasts = response;

  }

  private onLoadRelatedPodcastError(error) {
    this.loading = false;
    this.notify.notify('error',error.message)
  }


}
