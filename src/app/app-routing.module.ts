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
    component: SinglePodcastComponent,
    path: 'podcasts/:id'
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
    path: 'blog/:id'
  },
  {
    component: PodcastsCategoryComponent,
    path: 'podcasts-category/:id'
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
