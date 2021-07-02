import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import {PodcastsComponent} from './pages/podcasts/podcasts.component';
import {SinglePodcastComponent} from './pages/single-podcast/single-podcast.component';
import {ContactComponent} from './pages/contact/contact.component';
import {BlogComponent} from './pages/blog/blog.component';
import {SingleBlogComponent} from './pages/single-blog/single-blog.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {PodcastsCategoryComponent} from './pages/podcasts-category/podcasts-category.component';
import {BlogCategoryComponent} from './pages/blog-category/blog-category.component';
import {AboutComponent} from './pages/about/about.component';
import {DonateComponent} from './pages/donate/donate.component';



const routes: Routes = [
  {
    component: HomeComponent,
    path: '',
    pathMatch: 'full'
  },
  {
    component: PodcastsComponent,
    path: 'podcasts'
  },
  {
    component: AboutComponent,
    path: 'about'
  },
  {
    component: DonateComponent,
    path: 'donate'
  },
  {
    component: SinglePodcastComponent,
    path: 'podcasts/:cat/:id/:slug'
  },
  {
    component: ContactComponent,
    path: 'contact'
  },
  {
    component: BlogComponent,
    path: 'blog'
  },
  {
    component: SingleBlogComponent,
    path: 'blog/:cat/:id/:slug'
  },
  {
    component: PodcastsCategoryComponent,
    path: 'podcasts/:id/:slug'
  },
  {
    component: BlogCategoryComponent,
    path: 'blog/:id/:slug'
  },
  {
    component: NotFoundComponent,
    path: '**'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
