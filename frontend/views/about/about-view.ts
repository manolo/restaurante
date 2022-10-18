import { css, customElement, html, LitElement } from 'lit-element';

@customElement('about-view')
export class AboutView extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  render() {
    return html`<img width="90%" style="position:relative; left: 5%" src="images/carta.png">
    `;
  }
}
