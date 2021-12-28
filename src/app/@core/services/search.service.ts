import { Injectable } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

@Injectable({
    providedIn: 'root',
})
export class SearchService {

    search: String = '';
    placeholder: String = '';
    active: Boolean = false;
    source: LocalDataSource = new LocalDataSource();
    fields: Array<String> = [];

    constructor() { }

    /**
     * Ativa a Busca
     * @param source Base da tabela
     * @param fields Nome dos campos a serem pesquisados
     * @param placeholder Texto do placeholder
     */
    activateSearch(source: LocalDataSource, fields: Array<String>, placeholder?: String) {
        this.search = '';
        this.active = true;
        this.placeholder = placeholder;
        this.source = source;
        this.fields = fields;
    }

    /**
     * Desativa a pesquisa
     */
    inactivateSearch() {
        this.search = '';
        this.active = false;
        this.placeholder = '';
        this.source = new LocalDataSource();
        this.fields = [];
    }

    /**
     * Efetua a pesquisa
     */
    onSearch() {
        if (this.search.length > 0) {
            // Criando base de pesquisa
            const baseSearch: Array<any> = [];
            this.fields.forEach((item) => {
                baseSearch.push({
                    field: item,
                    search: this.search,
                });
            });

            // Pesquisando...
            this.source.setFilter(baseSearch, false);
        } else {
            // Se não houver nada no campo, limpa o filtro
            this.source.setFilter([]);
        }
    }
}
