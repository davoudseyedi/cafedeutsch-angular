import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {

  public showDropDown = false;


  constructor() { }

  public ngOnInit() { }

  public openDropDown(){
    this.showDropDown = !this.showDropDown;
  }

  public changeMenuState() {
    this.showDropDown = false;
  }


}
