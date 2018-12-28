/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { OrderComponentsPage, OrderDeleteDialog, OrderUpdatePage } from './order.page-object';

const expect = chai.expect;

describe('Order e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let orderUpdatePage: OrderUpdatePage;
    let orderComponentsPage: OrderComponentsPage;
    let orderDeleteDialog: OrderDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Orders', async () => {
        await navBarPage.goToEntity('order');
        orderComponentsPage = new OrderComponentsPage();
        expect(await orderComponentsPage.getTitle()).to.eq('matDataApp.order.home.title');
    });

    it('should load create Order page', async () => {
        await orderComponentsPage.clickOnCreateButton();
        orderUpdatePage = new OrderUpdatePage();
        expect(await orderUpdatePage.getPageTitle()).to.eq('matDataApp.order.home.createOrEditLabel');
        await orderUpdatePage.cancel();
    });

    it('should create and save Orders', async () => {
        const nbButtonsBeforeCreate = await orderComponentsPage.countDeleteButtons();

        await orderComponentsPage.clickOnCreateButton();
        await promise.all([
            orderUpdatePage.setDateInput('2000-12-31'),
            orderUpdatePage.setPriceInput('5'),
            orderUpdatePage.setPathInput('path'),
            orderUpdatePage.userSelectLastOption()
        ]);
        expect(await orderUpdatePage.getDateInput()).to.eq('2000-12-31');
        expect(await orderUpdatePage.getPriceInput()).to.eq('5');
        expect(await orderUpdatePage.getPathInput()).to.eq('path');
        await orderUpdatePage.save();
        expect(await orderUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await orderComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Order', async () => {
        const nbButtonsBeforeDelete = await orderComponentsPage.countDeleteButtons();
        await orderComponentsPage.clickOnLastDeleteButton();

        orderDeleteDialog = new OrderDeleteDialog();
        expect(await orderDeleteDialog.getDialogTitle()).to.eq('matDataApp.order.delete.question');
        await orderDeleteDialog.clickOnConfirmButton();

        expect(await orderComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
