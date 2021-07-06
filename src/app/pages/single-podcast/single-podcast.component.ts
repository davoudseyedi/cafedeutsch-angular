import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute} from '@angular/router';
import { Track } from 'ngx-audio-player';

@Component({
  selector: 'app-single-podcast',
  templateUrl: './single-podcast.component.html',
  styleUrls: ['./single-podcast.component.scss']
})
export class SinglePodcastComponent implements OnInit {

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
    image: '',
    category: '',
    audio: '',
    slug: ''
  };

  public id;

  public breadcrumb = [];

  constructor(private api: ApiService,
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
            name: 'بلاگ',
            url: '/blog',
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
    this.api
      .getPodcast(this.id)
      .subscribe({
        next: this.onLoadPodcastSuccess.bind(this),
        error: this.onLoadPodcastError.bind(this)
      });
  }

  private makePodcastItem(data){

    this.podcast = {
      nid: data[0].nid,
      title: data[0].title,
      body: data[0].body,
      created: data[0].created,
      image: data[0].field_podcast_image_export.url,
      category: data[0].field_podcast_category_export.name,
      audio: data[0].field_podcast,
      slug: data[0].slug
    };

    this.playlist = [{
      title: this.podcast.title,
      link: 'http://core.cafedeutsch.net' + this.podcast.audio,
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

  private onLoadPodcastSuccess(response) {

    this.makePodcastItem(response);
  }


  private onLoadPodcastError(error) {
    console.error('Error: ');
    console.error(error);
  }

}
