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
  public btnLoading = false;
  public isFlagged = false;

  public userId = 0;

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

  public cat = '';
  public slug = '';
  public name;
  public categoryUrl;

  public podcast = {
    nid: 0,
    title: null,
    body: '',
    created: '',
    publish_date: null,
    image: '',
    category: '',
    season: '',
    audio: '',
    slug: '',
    tag: [],
    uuid: ''
  };

  public publishDate;

  public catId = 0;
  public seasonId = 0;

  public podcasts = [];

  public id;

  public breadcrumb = [];

  constructor(private api: ApiService,
              private notify: NotifierService,
              private authService:AuthService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    // this.userId = this.authService.getUser()['uid'][0].value;

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
            name : this.podcast.category,
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
      .loadRelatedPodcasts(this.seasonId, this.catId)
      .subscribe({
        next: this.onLoadRelatedPodcastSuccess.bind(this),
        error: this.onLoadRelatedPodcastError.bind(this)
      });
  }

  private makePodcastItem(data){

    this.loading = false;

    this.podcast = {
      nid: data[0].nid,
      title: data[0].title,
      body: data[0].body,
      created: data[0].created,
      image: data[0].field_podcast_image_export.url,
      category: data[0].field_podcast_category_export.name,
      publish_date: data[0].publish_date,
      season: data[0].season.name,
      audio: data[0].field_podcast,
      slug: data[0].slug,
      tag: data[0].tag,
      uuid: data[0].uuid
    };

    this.publishDate = new Date(data[0].publish_date).getTime();

    this.catId = data[0].field_podcast_category_export.id;
    this.seasonId = data[0].season.id;

    this.playlist = [{
      title: this.podcast.title,
      link: 'https://core-test.cafedeutsch.net' + this.podcast.audio,
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
        url : this.categoryUrl + '/' + this.podcast.nid + this.podcast.slug
      }
    ];
  }

  public addToBookmark(id){
    this.btnLoading = true;
    this.isFlagged = true;

    let form = {
      "uid": this.userId,
      "flag_id": 'bookmark',
      "entity_id": id,
    }

    // let form = {
    //   "data": {
    //     "type": "flagging--bookmark",
    //     "attributes": {
    //       "entity_type": 'node',
    //       "entity_id": id,
    //       "global": false
    //     },
    //     "relationships": {
    //       "uid": {
    //         "data": {
    //           "type": "user--user",
    //           "id": this.userId
    //         }
    //       },
    //       "flagged_entity": {
    //         "data": {
    //           "type": "node--book",
    //           "id": this.podcast.uuid
    //         }
    //       }
    //     }
    //   }
    // }

    this.api
      .addBookmark(form)
      .subscribe({
        next: this.onAddBookmarkSuccess.bind(this),
        error: this.onAddBookmarkError.bind(this)
      });
  }

  private onLoadPodcastSuccess(response) {

    this.makePodcastItem(response);
    this.loadRelatedEpisodes();

  }

  private onLoadPodcastError(error) {
    this.loading = false;
    console.error('Error: ');
    console.error(error);
  }

  private onLoadRelatedPodcastSuccess(response) {

    this.loading = false;
    this.podcasts = response;

  }

  private onLoadRelatedPodcastError(error) {
    console.error('Error: ');
    console.error(error);
  }

  private onAddBookmarkSuccess(response) {

    this.btnLoading = false;
    this.notify.notify('success','با موفقیت ذخیره شد')

  }

  private onAddBookmarkError(error) {

    this.btnLoading = false;
    this.notify.notify('error',error.message)

  }

}
