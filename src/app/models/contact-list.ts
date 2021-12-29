
export class ContactList {
    phone: number;
    formatted: string;
    international: string;
    updatedAt: string;
    brazilDate: string;
    allowCall: boolean;
    hasRevisit: boolean;

    load(json: any): boolean {
        if (!json.hasOwnProperty('phone')) {
            return false;
        }

        try {
            this.phone = json.phone;
            this.formatted = json.formatted;
            this.international = json.international;
            this.updatedAt = json.updatedAt;
            this.brazilDate = json.brazilDate;
            this.allowCall = json.allowCall;
            this.hasRevisit = json.hasRevisit;
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
            this.allowCall = false;
            this.hasRevisit = false;
        } catch (err) {
            return false;
        }

        return true;
    }

    empty(): void {
        this.new();
    }
}
