import { InfoMessages } from 'app/@core/messages/InfoMessages';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from './../../../@core/services/contact.service';
import { Component, OnInit } from '@angular/core';
import { Contact } from 'app/models/contact';
import { UrlService } from 'app/@core/services/url.service';

@Component({
  selector: 'ngx-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {

  contact: Contact = new Contact();
  lastUrl: string = '';
  progress: number = 0;

  constructor(
    private service: ContactService,
    private route: ActivatedRoute,
    private router: Router,
    private infoMessage: InfoMessages,
    private urlService: UrlService,
  ) {
    this.router.events;
    this.lastUrl = this.urlService.getLastUrl().match(/phones/i) ? this.urlService.getLastUrl() : '/';
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      // é para cadastrar um novo?
      if (id === 'new') {

        this.contact.new();

      } else if (id.match(/^[0-9]+$/)) {

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
    });
  }

  /**
     * Volta para a listagem
     */
  back() {
    // Zera o template antes de sair
    this.contact.empty();
    this.router.navigateByUrl(this.lastUrl);
  }
}
