import { UrlService } from 'app/@core/services/url.service';
import { CustomRenderComponent } from './custom.render.component';
import { LocalDataSource } from 'ng2-smart-table';
import { SearchService } from './../../../@core/services/search.service';
import { InfoMessages } from './../../../@core/messages/InfoMessages';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { ContactService } from './../../../@core/services/contact.service';
import { Component, OnDestroy, TemplateRef } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'ngx-preaching',
  templateUrl: './preaching.component.html',
  styleUrls: ['./preaching.component.scss'],
})
export class PreachingComponent implements OnDestroy {
  settings = {
    hideSubHeader: true,
    rowClassFunction: (row) => {
      let classValue = '';
      if (row.data.hasRevisit) {
        classValue += ' revisits ';
      }
      if (row.data.allowCall) {
        classValue += ' allowcall ';
      }

      return classValue;
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
        sortDirection: 'asc',
        filter: true,
      },
      international: {
        title: 'Ligações',
        type: 'custom',
        sort: false,
        filter: false,
        renderComponent: CustomRenderComponent,
      },
    },
  };

  progress: number = 0;
  onlyCall: boolean = false;

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private service: ContactService,
    private dialogService: NbDialogService,
    private router: Router,
    private infoMessage: InfoMessages,
    private searchService: SearchService,
    private urlService: UrlService,
  ) {
    this.urlService.setOrigin(router.getCurrentNavigation().extractedUrl);
    this.onlyCall = window.localStorage.getItem('onlyCall') === '1';
    this.updateTableData();
  }

  ngOnDestroy(): void {
    this.searchService.inactivateSearch();
  }

  updateTableData() {
    (this.onlyCall ? this.service.getCall() : this.service.getAll())

      // Pega os dados do serviço do template
      .subscribe(data => {
        // Carrega os dados dos usuários
        this.source.load(data);
        this.source.setPaging(1, 9);
        this.searchService.activateSearch(this.source, ['phone', 'formatted', 'international'], 'Telefone...');
      });
  }

  setOnlyCall() {
    this.onlyCall = !this.onlyCall;
    if (this.onlyCall) {
      window.localStorage.setItem('onlyCall', '1');
    } else {
      window.localStorage.removeItem('onlyCall');
    }
    this.updateTableData();
  }

  /**
    * Ações dos botões personalizados
    * @param event Evento do click
    */
  onCustom(event, dialog: TemplateRef<any>) {
    // É pra editar?
    if (event.action === 'edit') {
      this.router.navigateByUrl('/pages/phones/edit/' + event.data.phone);
      return false;
    }

    // É pra deletar?
    if (event.action === 'delete') {
      this.dialogService.open(dialog, { context: event.data.phone });
      return false;
    }
  }

  /**
  * Apaga o contato
  * @param id ID do contato
  */
  onDelete(id: number) {
    this.progress = 1;
    this.service.delete(id).pipe(
      map((event: any) => {
        if (event.type === this.service.inProgress) {
          this.progress = this.service.getProgress(event);
        } else if (event.type === this.service.complete) {
          this.infoMessage.sucess('Telefone ' + id + ' apagado com sucesso!');
          // Se apagou, atualiza os dados
          this.updateTableData();
          this.progress = 0;
        }
      }),
      catchError((err: any) => {
        this.progress = 0;
        this.infoMessage.danger(err);
        return throwError(err.message);
      }),
    ).toPromise();
  }
}
