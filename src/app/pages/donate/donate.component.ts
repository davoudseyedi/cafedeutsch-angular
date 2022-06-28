import { Component, OnInit } from '@angular/core';
import {Language} from "../../services/language";
import {MetaService} from "../../services/meta.service";

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent implements OnInit {

  constructor(private metaService: MetaService) { }

  ngOnInit(): void {
    this.metaService.setTitle(Language.getTitle('DONATE'));
    this.metaService.setDescription(Language.getDescription('DONATE'));

  }

}
