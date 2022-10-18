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
    return html`
      <H3>ACME Restaurant</h3>
      <div>Alcalá de Henares</div>
    `;
  }
}
