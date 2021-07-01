import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute} from '@angular/router';
import { Track } from 'ngx-audio-player';
import {decoratorArgument} from 'codelyzer/util/astQuery';


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

  public podcast = {
    nid: 0,
    title: null,
    body: '',
    created: '',
    image: '',
    category: '',
    category_id: '',
    audio: ''
  };

  public id;

  constructor(private api: ApiService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(event => {
      this.id = event.get('id');

    });

    this.loadSinglePodcast();
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
          image: data[0].field_podcast_image,
          category: data[0].field_podcast_category,
          category_id: data[0].category_id,
          audio: data[0].field_podcast
        };
    this.playlist = [{
      title: this.podcast.title,
      link: 'http://core.cafedeutsch.net' + this.podcast.audio,
      artist: 'داود سیدی'
    }];
  }

  private onLoadPodcastSuccess(response) {

    console.log(response);
    this.makePodcastItem(response);
  }


  private onLoadPodcastError(error) {
    console.error('Error: ');
    console.error(error);
  }

}
