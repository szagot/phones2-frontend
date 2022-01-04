import { Component, OnDestroy, TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { InfoMessages } from 'app/@core/messages/InfoMessages';
import { UserService } from 'app/@core/services/user.service';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { User } from 'app/models/user';
import { SearchService } from 'app/@core/services/search.service';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnDestroy {

  settings = {
    hideSubHeader: true,
    rowClassFunction: (row) => {
      if (row.data.id === this.me.id) {
        return 'me';
      }

      return '';
    },
    noDataMessage: 'Nenhum usuário cadastrado.',
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
      id: {
        title: 'ID',
        type: 'text',
        filter: false,
      },
      name: {
        title: 'Nome',
        type: 'text',
        sort: true,
        sortDirection: 'asc',
        filter: true,
      },
      email: {
        title: 'Email',
        type: 'text',
        filter: false,
      },
      isAdmin: {
        title: 'Admin?',
        type: 'text',
        filter: false,
        valuePrepareFunction: (value) => value ? 'Sim' : 'Não',
      },
    },
  };

  progress: number = 0;

  source: LocalDataSource = new LocalDataSource();
  me: User = new User();

  constructor(
    private service: UserService,
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
      this.searchService.activateSearch('users', this.source, ['name', 'email'], 'Nome ou Email...');
      this.searchService.onSearch();
    });

    // Pega os dados do usuário atual
    this.service.getMe().subscribe(data => {
      // Carrega os dados do usuário logado
      this.me.load(data);
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

  /**
  * Apaga o template
  * @param id ID do Template a ser apagado
  */
  onDelete(id: number) {
    this.progress = 1;
    this.service.delete(id).pipe(
      map((event: any) => {
        if (event.type === this.service.inProgress) {
          this.progress = this.service.getProgress(event);
        } else if (event.type === this.service.complete) {
          this.infoMessage.sucess('Usuário ' + id + ' apagado com sucesso!');
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
