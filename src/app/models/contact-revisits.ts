
export class ContactRevisits {
    phone: number;
    formatted: string;
    international: string;
    resident: string;
    publisher: string;
    updatedAt: string;
    brazilDate: string;

    load(json: any): boolean {
        if (!json.hasOwnProperty('phone')) {
            return false;
        }

        try {
            this.phone = json.phone;
            this.formatted = json.formatted;
            this.international = json.international;
            this.resident = json.resident;
            this.publisher = json.publisher;
            this.updatedAt = json.updatedAt;
            this.brazilDate = json.brazilDate;
        } catch (err) {
            return false;
        }

        return true;
    }

    new(): boolean {
        try {
            this.phone = null;
            this.formatted = '';
            this.international = '';
            this.updatedAt = '';
            this.brazilDate = '';
        } catch (err) {
            return false;
        }

        return true;
    }

    empty(): void {
        this.new();
    }
}
