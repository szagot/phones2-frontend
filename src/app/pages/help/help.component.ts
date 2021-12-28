import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import * as marked from 'marked';

@Component({
  selector: 'ngx-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
})
export class HelpComponent {
  markdown: string = '';

  constructor(private http: HttpClient) {
    // Pega o Manual
    this.http.get('assets/help/manual-de-uso.md', { responseType: 'text' })
      .subscribe(data => {
        this.markdown = this.markdownToHtml(data);
      });
  }

  /**
   * Converte o html para markdown
   * @param markdown
   * @param options
   * @returns
   */
  private markdownToHtml(markdown: string, options?: marked.MarkedOptions): any {
    let html = '';
    if (markdown) {
      html = marked(markdown, options);
    }
    return html.replace(/src=(["'])/ig, 'src=$1assets/help/');
  }
}
