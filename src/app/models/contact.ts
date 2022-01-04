import { ContactNote } from './contact-note';

export class Contact {
    id: number;
    ddd: number;
    prefix: number;
    sufix: number;
    formatted: string;
    international: string;
    resident: string;
    publisher: string;
    dayOfWeek: number;
    dayOfWeekText: string;
    period: number;
    periodText: string;
    updatedAt: string;
    brazilDate: string;
    notes: ContactNote[] = [];

    load(contact: Contact) {
        try {
            this.id = contact.id;
            this.ddd = contact.ddd;
            this.prefix = contact.prefix;
            this.sufix = contact.sufix;
            this.formatted = contact.formatted;
            this.international = contact.international;
            this.resident = contact.resident;
            this.publisher = contact.publisher;
            this.dayOfWeek = contact.dayOfWeek;
            this.dayOfWeekText = contact.dayOfWeekText;
            this.period = contact.period;
            this.periodText = contact.periodText;
            this.updatedAt = contact.updatedAt;
            this.brazilDate = contact.brazilDate;
        } catch (err) {
            return false;
        }

        return true;
    }

    loadNotes(notes: ContactNote[]): boolean {
        try {
            this.notes = [];

            // Carrega as notas
            if (notes) {
                notes.forEach((note: ContactNote) => {
                    this.notes.push(note);
                });
            }

        } catch (err) {
            return false;
        }

        return true;
    }

    new(): boolean {
        try {
            this.id = null;
            this.ddd = null;
            this.prefix = null;
            this.sufix = null;
            this.formatted = '';
            this.international = '';
            this.resident = '';
            this.publisher = '';
            this.dayOfWeek = null;
            this.dayOfWeekText = '';
            this.period = null;
            this.periodText = '';
            this.updatedAt = '';
            this.brazilDate = '';
            this.notes = [];
        } catch (err) {
            return false;
        }

        return true;
    }

    empty(): void {
        this.new();
    }
}
