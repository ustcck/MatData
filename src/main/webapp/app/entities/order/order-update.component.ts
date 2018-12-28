import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IOrder } from 'app/shared/model/order.model';
import { OrderService } from './order.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-order-update',
    templateUrl: './order-update.component.html'
})
export class OrderUpdateComponent implements OnInit {
    order: IOrder;
    isSaving: boolean;

    users: IUser[];
    dateDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected orderService: OrderService,
        protected userService: UserService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ order }) => {
            this.order = order;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.order.id !== undefined) {
            this.subscribeToSaveResponse(this.orderService.update(this.order));
        } else {
            this.subscribeToSaveResponse(this.orderService.create(this.order));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrder>>) {
        result.subscribe((res: HttpResponse<IOrder>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
}
