import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {LocalStorageService} from "../../services/local-storage.service";
import {HelpersService} from "../../services/helpers.service";
import {NotifierService} from "angular-notifier";
import {Language} from "../../services/language";
import {MetaService} from "../../services/meta.service";

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

  public bookmarks: any[] = [];
  public loading = false;

  constructor(private apiService: ApiService,
              private localStorage: LocalStorageService,
              private helperService: HelpersService,
              private metaService: MetaService,
              private alertService: NotifierService) {

  }

  ngOnInit(): void {


    this.metaService.setTitle(Language.getTitle('BOOKMARK'));
    this.metaService.setDescription(Language.getDescription('BOOKMARK'));

    this.loadBookmarks();

  }

  public loadBookmarks(){

    this.loading = true;

    this.apiService.getBookmarksList().subscribe({
      next: this.getBookmarksSuccess.bind(this),
      error: this.getBookmarksError.bind(this)
    })

  }

  public unbookmark(podcastId:number){

    this.apiService
      .unbookmarkEpisode(podcastId)
      .subscribe({
        next: this.onLoadRemoveBookmarkSuccess.bind(this),
        error: this.onLoadRemoveBookmarkError.bind(this)
      });
  }

  private getBookmarksSuccess(response: any){
    this.loading = false;

    this.bookmarks = response;
  }
  private getBookmarksError(error: any){
    this.loading = false;

    this.alertService.notify('error',error.message);
  }

  private onLoadRemoveBookmarkSuccess(response) {
    this.alertService.notify('success','اپیزود از لیست شما با موفقیت حذف شد.');
    this.loadBookmarks();
  }

  private onLoadRemoveBookmarkError(error) {

    this.alertService.notify('error',error.message)

  }

  public checkPublishDate(date: string | null){
    const now = new Date().getTime();
    const pDate = new Date(date).getTime();
    if (pDate && pDate > now){
      return pDate;
    }
  }

}
