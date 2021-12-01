import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileSidebarComponent } from './profile-sidebar/profile-sidebar.component';
import {RouterModule} from "@angular/router";



@NgModule({
    declarations: [
        ProfileSidebarComponent
    ],
    exports: [
        ProfileSidebarComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class ProfileComponentModule { }
