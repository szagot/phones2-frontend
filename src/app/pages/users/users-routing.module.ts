import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPageComponent } from './users.component';
import { UserEditComponent } from './edit/user-edit.component';
import { UserListComponent } from './list/user-list.component';
import { RoleGuard } from 'app/@core/services/role-guard.service';

const routes: Routes = [{
  path: '',
  component: UserPageComponent,
  children: [
    {
      path: 'list',
      canActivate: [RoleGuard],
      component: UserListComponent,
    },
    {
      path: 'edit/:id',
      canActivate: [RoleGuard],
      component: UserEditComponent,
    },
    {
      path: '',
      redirectTo: 'list',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule { }

export const routedComponents = [
  UserPageComponent,
  UserListComponent,
  UserEditComponent,
];
