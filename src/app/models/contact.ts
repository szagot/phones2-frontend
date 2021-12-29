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

    loadNotes(notes: ContactNote[]): boolean {
        try {
            this.notes = [];

            // Carrega as notas
            if (notes.length) {
                notes.forEach((note: ContactNote) => {
                    this.notes.push(note);
                });
            }

        } catch (err) {
            return false;
        }

        return true;
    }
}
