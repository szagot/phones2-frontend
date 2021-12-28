import { Injectable } from '@angular/core';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Error } from 'app/models/error';

@Injectable()
export class InfoMessages {
    alertConfig = {
        position: NbGlobalPhysicalPosition.TOP_RIGHT,
        preventDuplicates: true,
        duration: 10000,
    };

    constructor(
        private toastrService: NbToastrService,
    ) { }

    danger(err: any, title?: string) {
        this.toastrService.danger(
            this.getMessage(err),
            title || 'Erro!',
            this.alertConfig,
        );
    }

    warning(msg: string, title?: string) {
        this.toastrService.warning(
            this.amendMessage(msg),
            title || 'Atenção!',
            this.alertConfig,
        );
    }

    sucess(msg: string, title?: string) {
        this.toastrService.success(
            this.amendMessage(msg),
            title || 'Sucesso!',
            this.alertConfig,
        );
    }

    getMessage(err: any) {
        if (!err) {
            return '';
        }

        const error = new Error();
        let message: string;
        if (error.load(err)) {
            message = error.getMessage();
        } else {
            try {
                message = err.message;
            } catch (e) { }
        }

        if (!message) {
            message = 'Desculpe, perdemos a comunicação. Tente novamente mais tarde';
        }

        return this.amendMessage(message);
    }

    /**
     * Remove os colchetes e espaços extras da mensagem de retorno, casa haja algum
     * @param msg
     * @returns
     */
    private amendMessage(msg: string): string {
        return msg.replace(/(^[\s\n\r\t]*\[|\][\s\n\r\t]*$)/g, '');
    }
}
