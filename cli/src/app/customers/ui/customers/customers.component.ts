import {
  Component,
  effect,
  EventEmitter,
  inject,
  input,
  Output,
} from '@angular/core';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CustomerPipe } from '../customer.pipe';
import { RouterLinkWithHref } from '@angular/router';
import { DatePipe, NgIf } from '@angular/common';
import { Customer } from '@app/customers/model';
import { Store } from '@ngrx/store';

export interface CustomerWithSelected extends Customer {
  selected: boolean;
}
export interface CustomersViewModel {
  customers: CustomerWithSelected[];
  pageIndex: number;
  length: number;
}

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    CustomerPipe,
    MatPaginatorModule,
    MatTableModule,
    MatSlideToggleModule,
    RouterLinkWithHref,
    NgIf,
    DatePipe,
  ],
})
export class CustomersComponent {
  viewModel = input.required<CustomersViewModel>();
  @Output() setSelected = new EventEmitter<number>();
  @Output() setUnselected = new EventEmitter<number>();
  @Output() switchPage = new EventEmitter<number>();

  displayedColumns = ['name', 'country', 'birthdate', 'action'];
  dataSource = new MatTableDataSource<CustomerWithSelected>([]);

  store = inject(Store);

  constructor() {
    effect(() => (this.dataSource.data = this.viewModel().customers));
  }

  toggleSelection(toggleChange: MatSlideToggleChange, id: number) {
    if (toggleChange.checked) {
      this.setSelected.emit(id);
    } else {
      this.setUnselected.emit(id);
    }
  }
}
