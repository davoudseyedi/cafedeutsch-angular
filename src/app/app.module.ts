import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


// Modules
import { AppRoutingModule } from './app-routing.module';
import { PipeModule } from './pipes/pipe.module';
import { ComponentModule } from './components/component.module';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { NotifierModule } from 'angular-notifier';




// Services
import { ApiService } from './services/api.service';
import { CustomInterceptor } from './interceptor/custom.interceptor';
import { LinkService } from './services/link.service';
import { MetaService } from './services/meta.service';
import { LocalStorageService } from './services/local-storage.service';
import { AuthService } from './services/auth.service';
import { HelpersService } from './services/helpers.service';
import { SinglePodcastComponent } from './pages/single-podcast/single-podcast.component';
import { PodcastsComponent } from './pages/podcasts/podcasts.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BlogComponent } from './pages/blog/blog.component';
import { SingleBlogComponent } from './pages/single-blog/single-blog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SinglePodcastComponent,
    PodcastsComponent,
    ContactComponent,
    BlogComponent,
    SingleBlogComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'main-app' }),
    FormsModule,
    ComponentModule,
    AppRoutingModule,
    HttpClientModule,
    PipeModule,
    NgxAudioPlayerModule,
    NotifierModule
  ],
  providers: [
    ApiService,
    {
      multi:    true,
      provide:  HTTP_INTERCEPTORS,
      useClass: CustomInterceptor
    },
    LinkService,
    MetaService,
    LocalStorageService,
    AuthService,
    HelpersService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
