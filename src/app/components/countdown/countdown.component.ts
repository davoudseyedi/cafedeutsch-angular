import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit , OnDestroy{

  @Input() public countdownDate;
  private subscription: Subscription;

  public dateNow;
  public dDay;

  public timeDifference;
  public secondsToDday;
  public minutesToDday;
  public hoursToDday;
  public daysToDday;


  private getTimeDifference(date) {
    this.dateNow = new Date();
    // console.log(this.dDay);
    this.timeDifference = date.getTime() - this.dateNow.getTime();
    this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits(timeDifference) {
    this.secondsToDday = Math.floor((timeDifference % ( 1000 * 60 )) / 1000);
    this.minutesToDday = Math.floor((timeDifference % ( 1000 * 60 * 60 )) / ( 1000 * 60 ));
    this.hoursToDday = Math.floor((timeDifference % ( 1000 * 60 * 60 * 24)) / ( 1000 * 60 * 60 ));
    this.daysToDday = Math.floor((timeDifference) / (1000 * 60 * 60 * 24));

  }

  constructor() {

  }

  ngOnInit() {

    this.dDay = new Date(this.countdownDate);

    if ( this.countdownDate != null ){
      this.subscription = interval(1000)
        .subscribe(x => { this.getTimeDifference(this.dDay); });
    }

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
