import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public background = '/assets/img/about.jpg';
  public subTitle = '                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز';

  public breadcrumb = [
    {
      name: 'خانه',
      url: '/'
    },
    {
      name: 'درباره ما',
      url: '/about'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
