/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { MatDataTestModule } from '../../../test.module';
import { OrderDeleteDialogComponent } from 'app/entities/order/order-delete-dialog.component';
import { OrderService } from 'app/entities/order/order.service';

describe('Component Tests', () => {
    describe('Order Management Delete Component', () => {
        let comp: OrderDeleteDialogComponent;
        let fixture: ComponentFixture<OrderDeleteDialogComponent>;
        let service: OrderService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MatDataTestModule],
                declarations: [OrderDeleteDialogComponent]
            })
                .overrideTemplate(OrderDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OrderDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
