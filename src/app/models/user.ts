
export class User {
    id: number;
    name: string;
    email: string;
    isAdmin: boolean;

    load(json: any): boolean {
        if (!json.hasOwnProperty('id')) {
            return false;
        }

        try {
            this.id = json.id;
            this.name = json.name;
            this.email = json.email;
            this.isAdmin = json.isAdmin;
        } catch (err) {
            return false;
        }

        return true;
    }

    new(): boolean {
        try {
            this.id = null;
            this.name = '';
            this.email = '';
            this.isAdmin = false;
        } catch (err) {
            return false;
        }

        return true;
    }

    empty(): void {
        this.id = null;
        this.name = '';
        this.email = '';
        this.isAdmin = false;
    }
}
