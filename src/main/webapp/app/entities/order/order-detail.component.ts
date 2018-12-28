import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrder } from 'app/shared/model/order.model';

@Component({
    selector: 'jhi-order-detail',
    templateUrl: './order-detail.component.html'
})
export class OrderDetailComponent implements OnInit {
    order: IOrder;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ order }) => {
            this.order = order;
        });
    }

    previousState() {
        window.history.back();
    }
}
