import { Component, OnInit} from '@angular/core';
import { MetaService } from '../../services/meta.service';
import { Router } from '@angular/router';
import { HelpersService } from '../../services/helpers.service';
import { AuthService } from '../../services/auth.service';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public permission = false;

  constructor( private metaService: MetaService,
               private router: Router,
               private apiService: ApiService,
               private helperService: HelpersService,
               private authService: AuthService ) { }

  ngOnInit(): void {

    this.permission = this.authService.checkProfilePermission('authenticated');
  }

}
