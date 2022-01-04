import { Injectable } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

@Injectable({
    providedIn: 'root',
})
export class SearchService {

    search: string = '';
    placeholder: string = '';
    active: Boolean = false;
    source: LocalDataSource = new LocalDataSource();
    fields: Array<String> = [];
    pages: any = {};
    actualPage: string = '';

    constructor() {
        Object.entries(window.sessionStorage).forEach((entry) => {
            const [key, value] = entry;
            if (key.match(/\.search$/)) {
                this.pages[key.replace('.search', '')] = value;
            }
        });
    }

    /**
     * Ativa a Busca
     * @param source Base da tabela
     * @param fields Nome dos campos a serem pesquisados
     * @param placeholder Texto do placeholder
     */
    activateSearch(actualPage: string, source: LocalDataSource, fields: Array<String>, placeholder?: string) {
        this.actualPage = actualPage;
        this.search = this.pages[this.actualPage] || '';
        this.active = true;
        this.placeholder = placeholder;
        this.source = source;
        this.fields = fields;
    }

    /**
     * Desativa a pesquisa
     */
    inactivateSearch() {
        this.actualPage = '';
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

    /**
     * Salva o texto da busca no storage
     */
    setDefaultText() {
        const index: string = this.actualPage + '.search';
        if (this.search) {
            window.sessionStorage.setItem(index, this.search);
        } else {
            window.sessionStorage.removeItem(index);
        }
        this.pages[this.actualPage] = this.search;
    }
}
