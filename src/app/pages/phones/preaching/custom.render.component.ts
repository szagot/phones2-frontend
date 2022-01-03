import { ContactService } from './../../../@core/services/contact.service';
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
        private service: ContactService,
    ) { }

    safeHtml(value) {
        return this.sanitized.bypassSecurityTrustHtml(value);
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

    private update(phone) {
        const id = phone.replace('+55', '');
        this.service.updateContact(id).subscribe(() => { });
        this.router.navigateByUrl('/pages/phones/edit/' + id);
    }
}
