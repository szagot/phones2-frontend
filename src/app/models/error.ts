import { HttpErrorResponse } from '@angular/common/http';

export class Error {
    errorCode: string;
    errorMessage: string;
    timestamp: string;

    load(error: HttpErrorResponse): boolean {
        try {
            if (error.error.errorMessage) {
                this.errorCode = error.error.errorCode;
                this.errorMessage = error.error.errorMessage;
                this.timestamp = error.error.timestamp;
            } else if (error.error.message) {
                this.errorCode = error.error.status.toString();
                this.errorMessage = error.error.message;
                this.timestamp = error.error.timestamp;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }

        return true;
    }

    getMessage(): string {
        return this.errorMessage;
    }
}
