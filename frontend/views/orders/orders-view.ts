import '@polymer/iron-icon';
import { showNotification } from '@vaadin/flow-frontend/a-notification';
import { EndpointError } from '@vaadin/flow-frontend/Connect';
import { CSSModule } from '@vaadin/flow-frontend/css-utils';
import { Binder, field } from '@vaadin/form';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-date-picker';
import '@vaadin/vaadin-form-layout/vaadin-form-layout';
import '@vaadin/vaadin-grid';
import { GridDataProviderCallback, GridDataProviderParams, GridElement } from '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
import '@vaadin/vaadin-icons';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-split-layout/vaadin-split-layout';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-text-field/vaadin-integer-field';
import '@vaadin/vaadin-combo-box';
import '@vaadin/vaadin-upload';
import { customElement, html, LitElement, property, query, unsafeCSS } from 'lit-element';
import * as CommandEndpoint from '../../generated/CommandEndpoint';
import Command from '../../generated/es/codemotion/rte/data/entity/Command';
import CommandModel from '../../generated/es/codemotion/rte/data/entity/CommandModel';
import styles from './orders-view.css';

@customElement('orders-view')
export class OrdersView extends LitElement {
  static get styles() {
    return [CSSModule('lumo-typography'), unsafeCSS(styles)];
  }

  @query('#grid')
  private grid!: GridElement;

  @property({ type: Number })
  private gridSize = 0;

  private gridDataProvider = this.getGridData.bind(this);

  private binder = new Binder<Command, CommandModel>(this, CommandModel);

  render() {
    return html`
      <vaadin-split-layout class="full-size">
        <div class="grid-wrapper">
          <vaadin-grid
            id="grid"
            class="full-size"
            theme="no-border"
            .size="${this.gridSize}"
            .dataProvider="${this.gridDataProvider}"
            @active-item-changed=${this.itemSelected}
          >
            <vaadin-grid-sort-column auto-width path="tableNumber"></vaadin-grid-sort-column>
            <vaadin-grid-sort-column auto-width path="type"></vaadin-grid-sort-column>
            <vaadin-grid-sort-column auto-width path="description"></vaadin-grid-sort-column>
            <vaadin-grid-sort-column auto-width path="quantity"></vaadin-grid-sort-column>
            <vaadin-grid-sort-column auto-width path="hour"></vaadin-grid-sort-column>
            <vaadin-grid-column auto-width path="served">
              <template>
                <vaadin-checkbox checked="[[item.served]]" disabled></vaadin-checkbox>
              </template>
            </vaadin-grid-column>
          </vaadin-grid>
        </div>
        <div id="editor-layout">
          <div id="editor">
            <vaadin-form-layout>
              <vaadin-combo-box label="Table number"
                .items="${[1,2,3,4,5,6,7,8]}"
                ...="${field(this.binder.model.tableNumber)}">
              </vaadin-combo-box>
              <vaadin-combo-box label="Type"
                .items="${['bebida', 'tapa', 'desayuno','comida','postre','racion']}"
                ...="${field(this.binder.model.type)}">
              </vaadin-combo-box>
              <vaadin-text-field label="Description"
                ...="${field(this.binder.model.description)}">
              </vaadin-text-field>
              <vaadin-integer-field label="Quantity" has-controls
                ...="${field(this.binder.model.quantity)}">
              </vaadin-integer-field>
              <vaadin-text-field label="Hour" readonly
                ...="${field(this.binder.model.hour)}">
              </vaadin-text-field>
              <vaadin-checkbox
                ...="${field(this.binder.model.served)}">
                Served
              </vaadin-checkbox>
            </vaadin-form-layout>
          </div>
          <vaadin-horizontal-layout id="button-layout" theme="spacing">
            <vaadin-button theme="primary" @click="${this.save}">Save</vaadin-button>
            <vaadin-button theme="tertiary" @click="${this.cancel}">Cancel</vaadin-button>
            <vaadin-button theme="tertiary error" @click="${this.delete}">Delete</vaadin-button>
          </vaadin-horizontal-layout>
        </div>
      </vaadin-split-layout>
    `;
  }

  private data!: Array<Command>;

  private async getGridData(params: GridDataProviderParams, callback: GridDataProviderCallback) {
    if (navigator.onLine) {
      const index = params.page * params.pageSize;
      this.data = await CommandEndpoint.list(index, params.pageSize, params.sortOrders as any);
    }
    callback(this.data);
  }

  async connectedCallback() {
    super.connectedCallback();
    this.refresh();
  }

  private async itemSelected(event: CustomEvent) {
    const item: Command = event.detail.value as Command;
    this.grid.selectedItems = item ? [item] : [];
    if (item && item.id) {
      this.binder.value = item;
    } else {
      this.clearForm();
    }
  }

  private async save() {
    try {
      if (!this.binder.value.id) {
        // We added a new item
        this.data.push(this.binder.value);
        this.gridSize = this.data.length;
      } else {
        const i = this.data.findIndex(item => item.id == this.binder.value.id);
        if (i >= 0) {
          this.data[i]= this.binder.value;
          this.grid.clearCache();
        }
      }
      const deferrableResult = await this.binder.submitTo(CommandEndpoint.update);
      this.clearForm();
      this.refreshGrid();
      if (deferrableResult.isDeferred) {
        showNotification('Command deferred.', { position: 'bottom-start' });
      } else {
        showNotification('Command stored.', { position: 'bottom-start' });
      }
    } catch (error: any) {
      if (error instanceof EndpointError) {
        showNotification('Server error. ' + error.message, { position: 'bottom-start' });
      } else {
        throw error;
      }
    }
  }

  private async delete() {
    try {
      const item = this.grid.activeItem as Command;
      if (item && item.served) {
        this.data = this.data.filter(i => i !== this.grid.activeItem);
        if (item.id) {
          console.log(item.id);
          await CommandEndpoint.delete(item.id);
        }
      }
      this.clearForm();
      this.refresh();
    } catch (error:  any) {
      if (error instanceof EndpointError) {
        showNotification('Server error. ' + error.message, { position: 'bottom-start' });
      } else {
        throw error;
      }
    }
  }

  private cancel() {
    this.grid.activeItem = undefined;
  }

  private clearForm() {
    this.binder.clear();
  }

  private refreshGrid() {
    if (this.grid) {
      this.grid.selectedItems = [];
      this.grid.clearCache();
    }
  }

  public async refresh() {
    this.refreshGrid();
    if (navigator.onLine) {
      this.gridSize = await CommandEndpoint.count();
    }
  }
}
