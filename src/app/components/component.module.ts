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




export function playerFactory() {
  return player;
}


@NgModule({
  declarations: [
    CoverComponent,
    LoadingComponent,
    ButtonDirective
  ],
  exports: [
    CoverComponent,
    LottieModule,
    LoadingComponent,
    ButtonDirective
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
