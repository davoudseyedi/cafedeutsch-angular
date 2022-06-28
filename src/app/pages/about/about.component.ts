import { Component, OnInit } from '@angular/core';
import {MetaService} from "../../services/meta.service";
import {Language} from "../../services/language";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public background = '/assets/img/about.jpg';
  public subTitle = 'کافه دویچ از رویکرد بسیار متفاوتی نسبت به سایر دوره ها یا وب سایت ها استفاده می کند. ما معتقدیم سریع ترین راه برای بهبود زبان آلمانی گوش دادن به مکالمات و بحث هایی است که می توانید درک کنید.';

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

  constructor(private metaService: MetaService) { }

  ngOnInit(): void {

    this.metaService.setTitle(Language.getTitle('ABOUT'))
    this.metaService.setDescription(Language.getDescription('ABOUT'))

    this.metaService.setTitle(Language.getTitle('ABOUT'))
    this.metaService.setDescription(Language.getDescription('ABOUT'))

  }

}
