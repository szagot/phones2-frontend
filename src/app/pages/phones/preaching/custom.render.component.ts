import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'ngx-preaching-buttons',
    templateUrl: './preaching.component.buttons.html',
    styleUrls: ['./preaching.component.scss'],
})
export class CustomRenderComponent implements ViewCell, OnInit {

    @Input() value: string | number;
    @Input() rowData: any;

    ngOnInit() {
    }

    constructor(
        private sanitized: DomSanitizer,
        private router: Router,
    ) { }

    safeHtml(value) {
        return this.sanitized.bypassSecurityTrustHtml(value);
    }

    /**
     * Envia pra edição após abrir o APP de ligação
     */
    phone(phone) {
        window.open('tel:' + phone);
        this.router.navigateByUrl('/pages/phones/edit/' + phone);
        return false;
    }

    /**
     * Envia pra edição após abrir o APP do whats
     */
     wpp(phone) {
        window.open('https://api.whatsapp.com/send?phone=' + phone);
        this.router.navigateByUrl('/pages/phones/edit/' + phone);
        return false;
    }
}
