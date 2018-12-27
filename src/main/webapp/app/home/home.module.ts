import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatDataSharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent } from './';
import { CarouselComponent } from 'app/carousel/carousel.component';

@NgModule({
    imports: [MatDataSharedModule, RouterModule.forChild([HOME_ROUTE])],
    declarations: [HomeComponent, CarouselComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MatDataHomeModule {}
