import { Flow } from '@vaadin/flow-frontend/Flow';
import { Router } from '@vaadin/router';
import './global-styles';

import client from './generated/connect-client.default';
import { DeferredCallSubmitter } from '@vaadin/flow-frontend';
import { OrdersView } from './views/orders/orders-view';

function refresh() {
  (document.querySelector('orders-view') as OrdersView)?.refresh();
}

client.deferredCallHandler = {
  async handleDeferredCallSubmission(deferredCallSubmitter: DeferredCallSubmitter) {
    try {
      await deferredCallSubmitter.submit();
      console.log('submission succeeded');
      refresh();
    } catch (error) {
      console.log('submission failed');
      deferredCallSubmitter.keepDeferredCallInTheQueue();
    }
  }
}
window.addEventListener('online', () => setTimeout(refresh, 200));

const { serverSideRoutes } = new Flow({
  imports: () => import('../target/frontend/generated-flow-imports'),
});

const routes = [
  // for client-side, place routes below (more info https://vaadin.com/docs/v15/flow/typescript/creating-routes.html)
  {
    path: '',
    component: 'main-view',
    action: async () => {
      await import('./views/main/main-view');
    },
    children: [
      {
        path: 'carta',
        component: 'about-view',
        action: async () => {
          await import('./views/about/about-view');
        },
      },
      {
        path: '',
        component: 'orders-view',
        action: async () => {
          await import('./views/orders/orders-view');
        },
      },
      // for server-side, the next magic line sends all unmatched routes:
      ...serverSideRoutes, // IMPORTANT: this must be the last entry in the array
    ],
  },
];

export const router = new Router(document.querySelector('#outlet'));
router.setRoutes(routes);
