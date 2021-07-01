import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {SlugifyPipe} from './slugify.pipe';

@NgModule({
  declarations: [
    SlugifyPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [SlugifyPipe],
})

export class PipeModule {}
