import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {SlugifyPipe} from './slugify.pipe';
import {JalaliDatePipe} from './jalali-date.pipe';
import { JalaliRelativePipe } from "./jalali-relative.pipe";

@NgModule({
  declarations: [
    SlugifyPipe,
    JalaliDatePipe,
    JalaliRelativePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [SlugifyPipe, JalaliDatePipe, JalaliRelativePipe],
})

export class PipeModule {}
