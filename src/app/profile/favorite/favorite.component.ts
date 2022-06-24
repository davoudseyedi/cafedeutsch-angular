import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {LocalStorageService} from "../../services/local-storage.service";
import {HelpersService} from "../../services/helpers.service";
import {NotifierService} from "angular-notifier";

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
              private alertService: NotifierService) {

  }

  ngOnInit(): void {

    this.loadBookmarks();

  }

  public loadBookmarks(){

    this.loading = true;

    this.apiService.getBookmarksList().subscribe({
      next: this.getBookmarksSuccess.bind(this),
      error: this.getBookmarksError.bind(this)
    })

  }

  private getBookmarksSuccess(response: any){
    this.loading = false;

    this.bookmarks = response;
  }
  private getBookmarksError(error: any){
    this.loading = false;

    this.alertService.notify('error',error.message)
  }

}
