import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss']
})
export class CoverComponent implements OnInit {

  @Input() public type: string;
  @Input() public title: any;
  @Input() public subtitle: any;
  @Input() public category: any;
  @Input() public publishDate: any;
  @Input() public season: any;
  @Input() public categoryID: any;
  @Input() public bg: any;
  @Input() public breadcrumbs = [];
  @Input() public podcastsList = [];
  @Input() public audio: any;
  @Input() public created: any;
  @Input() public loading: any;
  @Input() public publishDateNormal = false;

  public now = new Date();
  public pubDate;


  public displayVolumeControls = true;
  public displayRepeatControls = true;
  public displayDuration = true;
  public disablePositionSlider = false;


  constructor() {
  }

  ngOnInit(): void {
  }



}
