import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';
import { HelpComponent } from './help.component';

@NgModule({
  imports: [
    NbCardModule,
  ],
  declarations: [
    HelpComponent,
  ],
})
export class HelpModule { }
