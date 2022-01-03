import { NbDialogService } from '@nebular/theme';
import { map, catchError } from 'rxjs/operators';
import { InfoMessages } from 'app/@core/messages/InfoMessages';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from './../../../@core/services/contact.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Contact } from 'app/models/contact';
import { UrlService } from 'app/@core/services/url.service';
import { ContactNote } from 'app/models/contact-note';
import { throwError } from 'rxjs';

@Component({
  selector: 'ngx-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {

  contact: Contact = new Contact();
  lastUrl: string = '';
  progress: number = 0;
  progressNote: number = 0;
  progressNewNote: number = 0;
  progressDel: number = 0;
  addObs: boolean = false;
  newNote: ContactNote = new ContactNote();
  pageId: any = 'new';
  qtNotes: number = 0;
  finishNotes: number = 0;

  constructor(
    private service: ContactService,
    private route: ActivatedRoute,
    private router: Router,
    private infoMessage: InfoMessages,
    private urlService: UrlService,
    private dialogService: NbDialogService,
  ) {
    this.router.events;
    this.lastUrl = this.urlService.getOrigin().match(/phones/i) ? this.urlService.getOrigin() : '/';

    // Pegando data/hora local
    const tzoffset = (new Date()).getTimezoneOffset() * 60000;
    const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    this.newNote.dateContact = localISOTime.split('.')[0];
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pageId = params['id'];
      this.loadData();
    });
  }

  loadData() {
    const id = this.pageId;

    // ID é numérico?
    if (id.match(/^[0-9]+$/)) {

      this.service.getContact(id).subscribe(
        contact => {

          if (!this.contact.load(contact)) {
            this.back();
          }

          // Pega os dados das notas
          this.service.getContactNotes(this.contact.id).subscribe(
            notes => {
              // Se não conseguir fazer o load do retorno, ele volta pra listagem.
              if (!this.contact.loadNotes(notes)) {
                this.back();
              }
            },
          );
        },
        err => {
          this.back();
          this.infoMessage.danger(err);
        },
      );

    } else {
      this.back();
      this.infoMessage.warning('Informe um ID válido');
    }
  }

  /**
   * Salva as alterações
   */
  save() {
    // Salvando dados do morador
    this.progress = 1;
    this.service.alter(
      this.contact.id,
      this.contact.resident,
      this.contact.publisher,
      this.contact.dayOfWeek,
      this.contact.period,
    )
      .pipe(
        map((event: any) => {
          if (event.type === this.service.inProgress) {
            this.progress = this.service.getProgress(event);
          } else if (event.type === this.service.complete) {
            this.infoMessage.sucess('Contato salvo com sucesso!');
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

    // Salvando notas
    this.qtNotes = 0;
    this.finishNotes = 0;
    this.progressNote = 1;
    this.contact.notes.forEach((note) => {
      this.qtNotes++;
      this.service.alterNote(
        note.id,
        note.dateContact,
        note.text,
      )
        .pipe(
          map((event: any) => {
            if (event.type === this.service.inProgress) {
              this.progressNote = this.service.getProgress(event) / 2;
            } else if (event.type === this.service.complete) {
              this.finishNotes++;
              this.progressNote = (this.finishNotes >= this.qtNotes) ? 0 : (50 + this.finishNotes);
            }
          }),
          catchError((err: any) => {
            this.finishNotes++;
            this.progressNote = (this.finishNotes >= this.qtNotes) ? 0 : (50 + this.finishNotes);
            this.infoMessage.danger(err);
            return throwError(err.message);
          }),
        )
        .toPromise();
    });

    // Verificando nota nova
    if (this.addObs) {
      this.progressNewNote = 1;
      this.addObs = false;
      this.service.createNote(
        this.contact.id,
        this.newNote.dateContact,
        this.newNote.text,
      )
        .pipe(
          map((event: any) => {
            if (event.type === this.service.inProgress) {
              this.progressNewNote = this.service.getProgress(event);
            } else if (event.type === this.service.complete) {
              this.infoMessage.sucess('Nota nova salva com sucesso!');
              this.progressNewNote = 0;
            }
          }),
          catchError((err: any) => {
            this.progressNewNote = 0;
            this.infoMessage.danger(err);
            return throwError(err.message);
          }),
        )
        .toPromise();
    }

    this.verifySaves();
  }

  /**
   * Verifica finalização dos saves
   */
  verifySaves() {
    setTimeout(() => {
      if (this.finishNotes >= this.qtNotes && this.progressNote > 0) {
        this.infoMessage.sucess('Notas salvas com sucesso!');
        this.progressNote = 0;
      }

      if (this.progress === 0 && this.progressNote === 0 && this.progressNewNote === 0) {
        this.loadData();
      } else {
        this.verifySaves();
      }
    }, 100);
  }

  /**
   * Adiciona uma nota
   */
  addNote() {
    this.addObs = true;
  }

  /**
   * Confirmação de deleção
   */
  delete(id, dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, { context: id });
  }

  /**
   * Deleta a nota definitivamente
   */
  onDelete(id) {
    this.progressDel = 1;
    this.service.deleteNote(id).pipe(
      map((event: any) => {
        if (event.type === this.service.inProgress) {
          this.progressDel = this.service.getProgress(event);
        } else if (event.type === this.service.complete) {
          this.infoMessage.sucess('Nota ' + id + ' apagada com sucesso!');
          // Se apagou, atualiza os dados
          this.loadData();
          this.progressDel = 0;
        }
      }),
      catchError((err: any) => {
        this.progressDel = 0;
        this.infoMessage.danger(err);
        return throwError(err.message);
      }),
    ).toPromise();
  }

  /**
   * Volta para a listagem
   */
  back() {
    // Zera o template antes de sair
    this.service.freeContact(this.contact.id).subscribe(() => { });
    this.contact.empty();
    this.router.navigateByUrl(this.lastUrl);
  }

  /**
   * Envia pra edição após abrir o APP de ligação
   */
  phone(phone) {
    window.open('tel:' + phone);
    this.update(phone);
    return false;
  }

  /**
   * Envia pra edição após abrir o APP do whats
   */
  wpp(phone) {
    window.open('https://api.whatsapp.com/send?phone=' + phone);
    this.update(phone);
    return false;
  }

  /**
   * Atualiza a data do contato e vai para a edição
   */
  private update(phone) {
    const id = phone.replace('+55', '');
    this.service.updateContact(id).subscribe(() => { });
    this.router.navigateByUrl('/pages/phones/edit/' + id);
  }
}
