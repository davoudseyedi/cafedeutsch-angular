import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// Modules
import {ComponentModule} from '../components/component.module';
import {PipeModule} from '../pipes/pipe.module';

// Components
import { DashboardComponent } from './dashboard/dashboard.component';
import {UserGuard} from '../services/user-guard.service';
import {ProfileMainComponent} from './profile-main.component';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {ProfileComponentModule} from './component/component.module';
import { SettingComponent } from './setting/setting.component';
import { FavoriteComponent } from './favorite/favorite.component';



@NgModule({
  declarations: [
    ProfileMainComponent,
    DashboardComponent,
    SettingComponent,
    FavoriteComponent
  ],
  exports: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'panel',
        pathMatch: 'full'
      },
      {
        path: 'panel',
        canActivate: [UserGuard],
        component: ProfileMainComponent,
        children: [
          {
            path: '',
            redirectTo: 'dashboard'
          },
          {
            path: 'dashboard',
            canActivate: [UserGuard],
            component: DashboardComponent
          },
          {
            path: 'favorite',
            canActivate: [UserGuard],
            component: FavoriteComponent
          },
          {
            path: 'setting',
            canActivate: [UserGuard],
            component: SettingComponent
          },
        ]
      },
      {
        path: '**',
        redirectTo: 'panel'
      },
    ]),
    CommonModule,
    FormsModule,
    ComponentModule,
    PipeModule,
    ReactiveFormsModule,
    CarouselModule,
    ProfileComponentModule
  ],
  providers: [
    UserGuard
  ],
})
export class ProfileModule { }
