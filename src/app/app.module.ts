import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


// Modules
import { AppRoutingModule } from './app-routing.module';
import { PipeModule } from './pipes/pipe.module';
import { ComponentModule } from './components/component.module';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { NotifierModule } from 'angular-notifier';


// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';



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
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PodcastsCategoryComponent } from './pages/podcasts-category/podcasts-category.component';
import { BlogCategoryComponent } from './pages/blog-category/blog-category.component';

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
    SingleBlogComponent,
    NotFoundComponent,
    PodcastsCategoryComponent,
    BlogCategoryComponent
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
