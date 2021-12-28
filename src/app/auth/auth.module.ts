import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NbCardModule, NbIconModule, NbInputModule, NbMenuModule, NbSpinnerModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { AuthRoutingModule, routedComponents } from './auth-routing.module';

@NgModule({
  imports: [
    AuthRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    FormsModule,
    NbSpinnerModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class AuthModule {
}
