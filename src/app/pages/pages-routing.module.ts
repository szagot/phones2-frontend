import { RevisitsComponent } from './phones/revisits/revisits.component';
import { PreachingComponent } from './phones/preaching/preaching.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { HelpComponent } from './help/help.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'help',
      component: HelpComponent,
    },
    {
      path: 'phones/preaching',
      component: PreachingComponent,
    },
    {
      path: 'phones/revisits',
      component: RevisitsComponent,
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
