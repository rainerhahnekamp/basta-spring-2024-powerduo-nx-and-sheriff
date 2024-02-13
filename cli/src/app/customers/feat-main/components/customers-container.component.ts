import { Component, inject, Signal } from '@angular/core';
import {
  CustomersComponent,
  CustomersViewModel,
} from '@app/customers/ui/customers/customers.component';
import { createSelector, Store } from '@ngrx/store';
import { fromCustomers } from '@app/customers/data/customers.selectors';
import { customersActions } from '@app/customers/data/customers.actions';
import { CustomersEffects } from '@app/customers/data/customers.effects';

@Component({
  selector: 'app-customers-container',
  template: ` <app-customers
    [viewModel]="viewModel()"
    (setSelected)="setSelected($event)"
    (setUnselected)="setUnselected()"
    (switchPage)="switchPage($event)"
  ></app-customers>`,
  standalone: true,
  imports: [CustomersComponent],
  providers: [CustomersEffects],
})
export class CustomersContainerComponent {
  #store = inject(Store);
  viewModel: Signal<CustomersViewModel> = this.#store.selectSignal(
    createSelector(fromCustomers.selectPagedCustomers, (pagedCustomers) => ({
      customers: pagedCustomers.customers,
      pageIndex: pagedCustomers.page - 1,
      length: pagedCustomers.total,
    })),
  );

  setSelected(id: number) {
    this.#store.dispatch(customersActions.select({ id }));
  }

  setUnselected() {
    this.#store.dispatch(customersActions.unselect());
  }

  switchPage(page: number) {
    console.log('switch to page ' + page + ' is not implemented');
  }
}
