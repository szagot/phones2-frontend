import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UsersRoutingModule } from './users/users-routing.module';
import { FormsModule } from '@angular/forms';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NbCardModule, NbMenuModule, NbButtonModule, NbTreeGridModule, NbIconModule, NbInputModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { PreachingComponent } from './phones/preaching/preaching.component';
import { RevisitsComponent } from './phones/revisits/revisits.component';
import { EditComponent } from './phones/edit/edit.component';
import { NewComponent } from './phones/new/new.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    MiscellaneousModule,
    NbButtonModule,
    NbEvaIconsModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    FormsModule,
    UsersRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    PagesComponent,
    PreachingComponent,
    RevisitsComponent,
    EditComponent,
    NewComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class PagesModule {
}
