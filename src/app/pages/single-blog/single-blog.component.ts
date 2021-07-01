import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.scss']
})
export class SingleBlogComponent implements OnInit {

  public id;

  public blog = {
    nid: 0,
    title: null,
    body: '',
    created: '',
    image: '',
    category: '',
    category_id: '',
    slug: '',
    term_slug: ''
  };

  constructor(private api: ApiService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(event => {
      this.id = event.get('id');

    });

    this.loadSinglePost();
  }

  public loadSinglePost(){
    this.api
      .getPost(this.id)
      .subscribe({
        next: this.onLoadPostSuccess.bind(this),
        error: this.onLoadPostError.bind(this)
      });
  }

  private makePostItem(data){

    this.blog = {
      nid: data[0].nid,
      title: data[0].title,
      body: data[0].body,
      created: data[0].created,
      image: data[0].field_image,
      category: data[0].field_blog_category,
      category_id: data[0].category_id,
      slug: data[0].slug,
      term_slug: data[0].term_slug
    };
  }

  private onLoadPostSuccess(response) {

    console.log(response);
    this.makePostItem(response);
  }


  private onLoadPostError(error) {
    console.error('Error: ');
    console.error(error);
  }
}
