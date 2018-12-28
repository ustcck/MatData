import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { MatlabComponent } from 'app/matlab/matlab.component';
import { UserRouteAccessService } from 'app/core';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                ...LAYOUT_ROUTES,
                {
                    path: 'admin',
                    loadChildren: './admin/admin.module#MatDataAdminModule'
                },
                {
                    path: 'mat',
                    component: MatlabComponent,
                    data: {
                        authorities: ['ROLE_USER'],
                        pageTitle: 'global.menu.account.settings'
                    },
                    canActivate: [UserRouteAccessService]
                }
            ],
            { useHash: true, enableTracing: DEBUG_INFO_ENABLED }
        )
    ],
    exports: [RouterModule]
})
export class MatDataAppRoutingModule {}
