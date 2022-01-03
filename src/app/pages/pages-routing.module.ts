import { NewComponent } from './phones/new/new.component';
import { EditComponent } from './phones/edit/edit.component';
import { RevisitsComponent } from './phones/revisits/revisits.component';
import { PreachingComponent } from './phones/preaching/preaching.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'phones/preaching',
      component: PreachingComponent,
    },
    {
      path: 'phones/revisits',
      component: RevisitsComponent,
    },
    {
      path: 'phones/edit/:id',
      component: EditComponent,
    },
    {
      path: 'phones/new',
      component: NewComponent,
    },
    {
      path: 'users',
      loadChildren: () => import('./users/users.module')
        .then(m => m.UsersPageModule),
    },

    {
      path: '',
      redirectTo: 'phones/preaching',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
