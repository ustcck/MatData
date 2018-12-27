import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
    selector: 'jhi-carousel-basic',
    templateUrl: './carousel.component.html',
    styleUrls: ['carousel.scss'],
    providers: [NgbCarouselConfig] // add NgbCarouselConfig to the component providers
})
export class CarouselComponent implements OnInit {
    images: Array<string>;
    carousel_1 = require(`../../content/images/pic/1.jpg`);
    carousel_2 = require(`../../content/images/pic/2.jpg`);
    carousel_3 = require(`../../content/images/pic/3.jpg`);

    constructor(config: NgbCarouselConfig, private _http: HttpClient) {
        // customize default values of carousels used by this component tree
        config.interval = 3000;
        config.wrap = true;
        config.keyboard = true;
    }
    ngOnInit() {
        // this._http.get('https://picsum.photos/list')
        //     .pipe(map((images: Array<{ id: number }>) => this._randomImageUrls(images)))
        //     .subscribe(images => this.images = images);
        // this.images = [this.carousel_1, this.carousel_2, this.carousel_3];

        this.images = [1, 2, 3].map(() => {
            const random = Math.floor(Math.random() * 114);
            return require(`../../content/images/pic/${random}.jpg`);
        });
    }

    private _randomImageUrls(images: Array<{ id: number }>): Array<string> {
        return [1, 2, 3].map(() => {
            const randomId = images[Math.floor(Math.random() * images.length)].id;
            return `https://picsum.photos/1900/400?image=${randomId}`;
        });
    }
}
