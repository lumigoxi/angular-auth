import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeshboardLayoutComponent } from './layouts/deshboard-layout/deshboard-layout.component';
import { isAuthenticatedGuard } from './guards/is-authenticated.guard';

const routes: Routes = [
    {
        path: '',
        component: DeshboardLayoutComponent,
        canActivate: [isAuthenticatedGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
