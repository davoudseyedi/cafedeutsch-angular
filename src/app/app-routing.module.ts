import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import {PodcastsComponent} from './pages/podcasts/podcasts.component';
import {SinglePodcastComponent} from './pages/podcasts/single-podcast/single-podcast.component';
import {ContactComponent} from './pages/contact/contact.component';
import {BlogComponent} from './pages/blog/blog.component';
import {SingleBlogComponent} from './pages/blog/single-blog/single-blog.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {PodcastsCategoryComponent} from './pages/podcasts/podcasts-category/podcasts-category.component';
import {BlogCategoryComponent} from './pages/blog/blog-category/blog-category.component';
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
    path: 'podcasts/:cat'
  },
  {
    component: BlogCategoryComponent,
    path: 'blog/:cat'
  },
  {
    loadChildren: () => import('../app/profile/profile.module').then(m => m.ProfileModule),
    path: 'profile',
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
