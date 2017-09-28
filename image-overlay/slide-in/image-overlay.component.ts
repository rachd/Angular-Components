/************************************** 
* USAGE: pass in two strings with image paths for main image and overlay image.  
*     As the user scrolls, the overlay will slide down from the top.
* TODO: throttle the scroll function
***************************************/

import { Component, Input, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'ax-image-overlay',
  template: `<img class="image" src="{{image}}"/>
            <div class="overlay" [ngStyle]="{'background-image': 'url(' + overlay + ')', 'top': percentShowing + '%'}"></div>`,
  styleUrls: ['./image-overlay.component.scss']
})
export class ImageOverlayComponent implements OnInit {
    @Input() image: string;
    @Input() overlay: string;
    percentShowing: number;

    constructor(private elRef:ElementRef){}

    ngOnInit() {
        const THROTTLE_INTERVAL = 50;
        window.addEventListener('scroll', (e) => {
            this.percentShowing = this.percentScrolledIntoView(this.elRef.nativeElement);
        });
    }

    percentScrolledIntoView(el) {
        const START_SHOWING = 50;
        const elemHeight = el.getBoundingClientRect().height;
        const elemTop = el.getBoundingClientRect().top;
        
        const amountTopShowing = window.innerHeight - elemTop;
        if (amountTopShowing < START_SHOWING) {
            return -100;
        } else if (amountTopShowing < (elemHeight + START_SHOWING)) {
            return -100 + ((amountTopShowing - START_SHOWING) / elemHeight * 100);
        } else {
            return 0;
        }
    }
}
