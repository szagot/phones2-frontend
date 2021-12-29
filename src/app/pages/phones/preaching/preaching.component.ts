import { LocalDataSource } from 'ng2-smart-table';
import { SearchService } from './../../../@core/services/search.service';
import { InfoMessages } from './../../../@core/messages/InfoMessages';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { ContactService } from './../../../@core/services/contact.service';
import { Component, OnDestroy, TemplateRef } from '@angular/core';

@Component({
  selector: 'ngx-preaching',
  templateUrl: './preaching.component.html',
  styleUrls: ['./preaching.component.scss'],
})
export class PreachingComponent implements OnDestroy {
  settings = {
    hideSubHeader: true,
    rowClassFunction: (row) => {
      if (row.data.hasRevisit) {
        return 'revisits';
      }

      return '';
    },
    noDataMessage: 'Nenhum contato cadastrado.',
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      columnTitle: 'Ações',
      custom: [
        {
          name: 'edit',
          title: '<i class="nb-edit edit" title="Alterar Usuário"></i>',
        },
        {
          name: 'delete',
          title: '<i class="nb-trash delete" title="Apagar Usuário"></i>',
        },
      ],
    },
    columns: {
      formatted: {
        title: 'Telefone',
        type: 'text',
        sort: true,
        sortDirection: 'asc',
        filter: true,
      },
      updatedAt: {
        title: 'Data Contato',
        type: 'html',
        filter: true,
        valuePrepareFunction: (value, row) => `<time datetime="${value}">${row.brazilDate}</time>`,
      },
      hasRevisit: {
        title: 'Revisita?',
        type: 'text',
        filter: false,
        valuePrepareFunction: (value) => value ? 'Sim' : 'Não',
      },
      international: {
        title: 'Ligações',
        type: 'html',
        filter: false,
        valuePrepareFunction: (value, row) => `
          <div class="icon-big">
              <a href="tel:${value}" class="phone btn btn-info btn-small" data-phone="${row.phone}" target="tel">
                  <i class="nb-phone"></i> Ligar
              </a>
              <a href="https://api.whatsapp.com/send?phone=${value}" class="whatsapp btn btn-success btn-small" data-phone="${row.phone}" target="wpp">
              <i class="nb-volume-high"></i>
              </a>
          </div>
        `,
      },
    },
  };

  isRejected: boolean = false;
  rejectedText: string[] = [];
  emailTeste: string[] = [];
  progress: number = 0;

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private service: ContactService,
    private dialogService: NbDialogService,
    private router: Router,
    private infoMessage: InfoMessages,
    private searchService: SearchService,
  ) {
    this.updateTableData();
  }

  ngOnDestroy(): void {
    this.searchService.inactivateSearch();
  }

  updateTableData() {
    // Pega os dados do serviço do template
    this.service.getAll().subscribe(data => {
      // Carrega os dados dos usuários
      this.source.load(data);
      this.searchService.activateSearch(this.source, ['name', 'email'], 'Telefone...');
    });
  }

  /**
    * Ações dos botões personalizados
    * @param event Evento do click
    */
  onCustom(event, dialog: TemplateRef<any>) {
    // É pra editar?
    if (event.action === 'edit') {
      this.router.navigateByUrl('/pages/users/edit/' + event.data.id);
      return false;
    }

    // É pra deletar?
    if (event.action === 'delete') {
      this.dialogService.open(dialog, { context: event.data.id });
      return false;
    }
  }
}
