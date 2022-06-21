import { map, catchError } from 'rxjs/operators';
import { NbDialogService } from '@nebular/theme';
import { InfoMessages } from 'app/@core/messages/InfoMessages';
import { ContactService } from './../../../@core/services/contact.service';
import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';

@Component({
  selector: 'ngx-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {

  progress: number = 0;
  ddd: number = 19;
  prefix: number = null;
  sufixStart: number = null;
  sufixEnd: number = null;

  constructor(
    private service: ContactService,
    private infoMessage: InfoMessages,
    private dialogService: NbDialogService,
  ) { }

  ngOnInit(): void {
  }

  dataIsValid() {
    return (
      this.ddd >= 10 && this.ddd <= 99 &&
      this.prefix >= 1000 && this.prefix <= 99999 &&
      this.sufixStart >= 0 && this.sufixStart <= 9999 && this.sufixStart != null &&
      ((this.sufixEnd >= this.sufixStart && this.sufixEnd <= 9999) || !this.sufixEnd)
    );
  }

  generate(dialog) {
    this.dialogService.open(dialog);
  }

  onGenerate() {
    if (this.dataIsValid()) {
      this.service.create(
        this.ddd,
        this.prefix,
        this.sufixStart,
        this.sufixEnd,
      )
        .pipe(
          map((event: any) => {
            if (event.type === this.service.inProgress) {
              this.progress = this.service.getProgress(event);
            } else if (event.type === this.service.complete) {
              this.infoMessage.sucess('Contato(s) gerado(s) com sucesso!');
              this.ddd = 19;
              this.prefix = null;
              this.sufixStart = null;
              this.sufixEnd = null;
              this.progress = 0;
            }
          }),
          catchError((err: any) => {
            this.progress = 0;
            this.infoMessage.danger(err);
            return throwError(err.message);
          }),
        )
        .toPromise();
    }
  }

  pad(num: number, size: number): string {
    let s = num + '';
    while (s.length < size) s = '0' + s;
    return s;
  }
}
