import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Order } from 'app/shared/model/order.model';
import { OrderService } from './order.service';
import { OrderComponent } from './order.component';
import { OrderDetailComponent } from './order-detail.component';
import { OrderUpdateComponent } from './order-update.component';
import { OrderDeletePopupComponent } from './order-delete-dialog.component';
import { IOrder } from 'app/shared/model/order.model';

@Injectable({ providedIn: 'root' })
export class OrderResolve implements Resolve<IOrder> {
    constructor(private service: OrderService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Order> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Order>) => response.ok),
                map((order: HttpResponse<Order>) => order.body)
            );
        }
        return of(new Order());
    }
}

export const orderRoute: Routes = [
    {
        path: 'order',
        component: OrderComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'matDataApp.order.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order/:id/view',
        component: OrderDetailComponent,
        resolve: {
            order: OrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'matDataApp.order.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order/new',
        component: OrderUpdateComponent,
        resolve: {
            order: OrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'matDataApp.order.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order/:id/edit',
        component: OrderUpdateComponent,
        resolve: {
            order: OrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'matDataApp.order.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const orderPopupRoute: Routes = [
    {
        path: 'order/:id/delete',
        component: OrderDeletePopupComponent,
        resolve: {
            order: OrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'matDataApp.order.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
