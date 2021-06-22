import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


// Components
import { FormsModule } from '@angular/forms';
import { CoverComponent } from './cover/cover.component';


@NgModule({
    declarations: [
    CoverComponent
  ],
    exports: [
      CoverComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule
    ],
    providers: [],
})

export class ComponentModule {}
