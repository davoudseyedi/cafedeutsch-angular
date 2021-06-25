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
  @Input() public bg: any;


  constructor() { }

  ngOnInit(): void {
  }

}
