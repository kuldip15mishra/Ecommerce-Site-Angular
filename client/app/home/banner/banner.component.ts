import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'salientink-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  constructor(private el: ElementRef) { }
  images: any[];
  public carouselOptions: Object = {
    items: 1,
    autoplay: true,
    loop: true,
    center: true,
    lazyLoad: true,
    margin: 10,
  };

  ngOnInit() {
    this.images = [
      { src: 'assets/fashion/fashion-glasses-go-pro-female-157888.jpeg' },
      { src: 'assets/fashion/girl-dandelion-yellow-flowers-160699.jpeg' },
      { src: 'assets/fashion/model-fashion-attractive-female-39657.jpeg' },
      { src: 'assets/fashion/pexels-photo-24156.jpeg' },
      { src: 'assets/fashion/pexels-photo-26549.jpeg' },
      { src: 'assets/fashion/pexels-photo-119654.jpeg' },
      { src: 'assets/fashion/pexels-photo-179909.jpeg' },
      { src: 'assets/fashion/pexels-photo-247199.jpeg' },
      { src: 'assets/fashion/pexels-photo-247295.jpeg' },
      { src: 'assets/fashion/pexels-photo-298863.jpeg' },
      { src: 'assets/fashion/pexels-photo-285171.jpeg' },
      { src: 'assets/fashion/pexels-photo-291762.jpeg' },
    ]
  }

}
