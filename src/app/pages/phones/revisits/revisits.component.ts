import { UrlService } from 'app/@core/services/url.service';
import { LocalDataSource } from 'ng2-smart-table';
import { SearchService } from './../../../@core/services/search.service';
import { Router } from '@angular/router';
import { ContactService } from './../../../@core/services/contact.service';
import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'ngx-revisits',
  templateUrl: './revisits.component.html',
  styleUrls: ['./revisits.component.scss'],
})
export class RevisitsComponent implements OnDestroy {

  settings = {
    hideSubHeader: true,
    noDataMessage: 'Nenhuma revisita cadastrada.',
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
      ],
    },
    columns: {
      formatted: {
        title: 'Telefone',
        type: 'text',
        sortDirection: 'asc',
        filter: true,
      },
      resident: {
        title: 'Morador',
        type: 'text',
        filter: true,
      },
      updatedAt: {
        title: 'Publicador/Data',
        type: 'html',
        filter: true,
        valuePrepareFunction: (value, row) => `
          ${row.publisher || '[Não Informado]'}<br>
          <time class="denycall" datetime="${value}">${row.brazilDate}</time>
        `,
      },
    },
  };

  progress: number = 0;
  source: LocalDataSource = new LocalDataSource();

  constructor(
    private service: ContactService,
    private router: Router,
    private searchService: SearchService,
    private urlService: UrlService,
  ) {
    urlService.setOrigin(router.getCurrentNavigation().extractedUrl);
    this.updateTableData();
  }

  ngOnDestroy(): void {
    this.searchService.inactivateSearch();
  }

  updateTableData() {
    // Pega os dados do serviço do template
    this.service.getRevisits().subscribe(data => {
      // Carrega os dados dos usuários
      this.source.load(data);
      this.source.setPaging(1, 8);
      this.searchService.activateSearch('revisits', this.source, ['phone', 'formatted', 'resident', 'publisher'], 'Telefone, Morador ou Publicador...');
      this.searchService.onSearch();
    });
  }

  /**
    * Ações dos botões personalizados
    * @param event Evento do click
    */
  onCustom(event) {
    // É pra editar?
    if (event.action === 'edit') {
      this.router.navigateByUrl('/pages/phones/edit/' + event.data.phone);
      return false;
    }
  }
}
