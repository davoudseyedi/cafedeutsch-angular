import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {SlugifyPipe} from './slugify.pipe';
import {JalaliDatePipe} from './jalali-date.pipe';

@NgModule({
  declarations: [
    SlugifyPipe,
    JalaliDatePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [SlugifyPipe, JalaliDatePipe],
})

export class PipeModule {}
