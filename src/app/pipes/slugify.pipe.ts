import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'slugify'})
export class SlugifyPipe implements PipeTransform {
  transform(input: string): string {
    return input
      .replace(/\s+/g, '-').toLowerCase();       // Replace spaces with -
      // .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      // .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      // .replace(/^-+/, '')             // Trim - from start of text
      // .replace(/-+$/, '');            // Trim - from end of text
  }
}
