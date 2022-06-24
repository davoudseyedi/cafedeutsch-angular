import {Component,EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from "../../services/auth.service";

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
  @Input() public flagged : boolean;

  @Output() public addBookmark = new EventEmitter();
  @Output() public actionRemoveBookmark = new EventEmitter();

  public now = new Date().getTime();
  public pubDate;

  public isUser;


  public displayVolumeControls = true;
  public displayRepeatControls = true;
  public displayDuration = true;
  public disablePositionSlider = false;


  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {

    this.isUser = this.authService.isUser();

  }

  public bookmark(){

    this.addBookmark.emit();

  }

  public unBookmark(){

    this.actionRemoveBookmark.emit();

  }



}
