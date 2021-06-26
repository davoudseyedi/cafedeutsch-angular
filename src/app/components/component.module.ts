import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LottieModule } from "ngx-lottie";
import player from 'lottie-web';


// Components
import { FormsModule } from '@angular/forms';
import { CoverComponent } from './cover/cover.component';
import { LoadingComponent } from "./loading/loading.component";
import { ButtonDirective } from "./button/button.component";
import { BlogCategoriesComponent } from './blog-categories/blog-categories.component';
import { SearchSidebarComponent } from './search-sidebar/search-sidebar.component';




export function playerFactory() {
  return player;
}


@NgModule({
  declarations: [
    CoverComponent,
    LoadingComponent,
    ButtonDirective,
    BlogCategoriesComponent,
    SearchSidebarComponent
  ],
  exports: [
    CoverComponent,
    LottieModule,
    LoadingComponent,
    ButtonDirective,
    BlogCategoriesComponent,
    SearchSidebarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LottieModule.forRoot({player: playerFactory})
  ],
  providers: [],
})

export class ComponentModule {}
