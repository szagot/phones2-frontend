import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { UsersRoutingModule, routedComponents } from './users-routing.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';

@NgModule({
  imports: [
    NbButtonModule,
    NbEvaIconsModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    FormsModule,
    UsersRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class UsersPageModule { }
