import { ContactNote } from './../../models/contact-note';
import { ContactRevisits } from './../../models/contact-revisits';
import { ContactList } from './../../models/contact-list';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Contact } from 'app/models/contact';

@Injectable({
    providedIn: 'root',
})
export class ContactService {
    // Service status
    inProgress = HttpEventType.UploadProgress;
    complete = HttpEventType.Response;
    progressOptions: any = {
        reportProgress: true,
        observe: 'events',
    };

    constructor(
        private http: HttpClient,
    ) { }

    /**
     * Devolve o progresso atual
     */
    getProgress(event: any) {
        return Math.round((100 / event.total) * event.loaded);
    }

    /**
     * Pega todos os contatos
     */
    getAll(): Observable<ContactList[]> {
        return this.http.get<ContactList[]>(environment.endpoint + environment.getContacts);
    }

    /**
     * Pega todos os contatos passíveis de ligação
     */
    getCall(): Observable<ContactList[]> {
        return this.http.get<ContactList[]>(environment.endpoint + environment.getContactsToCall);
    }

    /**
     * Pega todas as revisitas
     */
    getRevisits(): Observable<ContactRevisits[]> {
        return this.http.get<ContactRevisits[]>(environment.endpoint + environment.getRevisits);
    }

    /**
     * Pega um contato pelo ID
     * @param id
     */
    getContact(id: number): Observable<Contact> {
        return this.http.get<Contact>(environment.endpoint + environment.getContact + id);
    }

    /**
     * Libera um contato
     * @param id
     */
    freeContact(id: number): Observable<any> {
        return this.http.get<any>(environment.endpoint + environment.freeContact + id);
    }

    /**
     * Atualiza a data de um contato
     * @param id
     */
    updateContact(id: number): Observable<any> {
        return this.http.get<any>(environment.endpoint + environment.updateContact + id);
    }

    /**
     * Pega as notas de um contato
     * @param id ID do contato
     */
    getContactNotes(id: number): Observable<ContactNote[]> {
        return this.http.get<ContactNote[]>(environment.endpoint + environment.getNotes + id);
    }

    /**
     * Apaga uma nota pelo ID
     * @param id
     */
    deleteNote(id: number): Observable<any> {
        return this.http.delete(environment.endpoint + environment.delNote + id, this.progressOptions);
    }

    /**
     * Cadastra uma observação
     */
    createNote(contactId: number, contactDate: string, text: string): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('contactDate', contactDate);
        formData.append('text', text);
        return this.http.post(
            environment.endpoint + environment.createNote + contactId,
            formData,
            this.progressOptions,
        );
    }

    /**
     * Altera uma observação
     */
    alterNote(id: number, contactDate: string, text: string): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('contactDate', contactDate);
        formData.append('text', text);
        return this.http.patch(environment.endpoint + environment.alterNote + id, formData, this.progressOptions);
    }

    /**
     * Apaga um contato pelo ID
     * @param id
     */
    delete(id: number): Observable<any> {
        return this.http.delete(environment.endpoint + environment.delContact + id, this.progressOptions);
    }

    /**
     * Cadastra um contato
     */
    create(ddd: number, prefix: number, sufixStart: number, sufixEnd?: number): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('ddd', ddd.toString());
        formData.append('prefix', prefix.toString());
        formData.append('sufixStart', sufixStart.toString());
        if (sufixEnd) formData.append('sufixEnd', sufixEnd.toString());

        return this.http.post(environment.endpoint + environment.createContact, formData, this.progressOptions);
    }

    /**
     * Altera um contato
     */
    alter(id: number, resident: string, publisher: string, dayOfWeek: number, period: number): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('resident', resident);
        formData.append('publisher', publisher);
        formData.append('dayOfWeek', dayOfWeek.toString());
        formData.append('period', period.toString());

        return this.http.patch(environment.endpoint + environment.alterContact + id, formData, this.progressOptions);
    }

}
