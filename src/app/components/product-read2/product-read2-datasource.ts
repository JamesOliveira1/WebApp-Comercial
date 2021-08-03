import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Product } from '../product/product.model';



// TODO: replace this with real data from your application
const EXAMPLE_DATA: Product[] = [
  {id: 1, name: 'Hydrogen', contact:'4983893893', details:'nada'},
  {id: 2, name: 'Helium', contact:'4983893893', details:'nada'},
  {id: 3, name: 'Lithium', contact:'4983893893', details:'nada'},
  {id: 4, name: 'Beryllium', contact:'4983893893', details:'nada'},
  {id: 5, name: 'Boron', contact:'4983893893', details:'nada'},
  {id: 6, name: 'Carbon', contact:'4983893893', details:'nada'},
  {id: 7, name: 'Nitrogen', contact:'4983893893', details:'nada'},
  {id: 8, name: 'Oxygen', contact:'4983893893', details:'nada'},
  {id: 9, name: 'Fluorine', contact:'4983893893', details:'nada'},
  {id: 10, name: 'Neon', contact:'4983893893', details:'nada'},
  {id: 11, name: 'Sodium', contact:'4983893893', details:'nada'},
  {id: 12, name: 'Magnesium', contact:'4983893893', details:'nada'},
  {id: 13, name: 'Aluminum', contact:'4983893893', details:'nada'},
  {id: 14, name: 'Silicon', contact:'4983893893', details:'nada'},
  {id: 15, name: 'Phosphorus', contact:'4983893893', details:'nada'},
  {id: 16, name: 'Sulfur', contact:'4983893893', details:'nada'}
];

/**
 * Data source for the ProductRead2 view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ProductRead2DataSource extends DataSource<Product> {
  data: Product[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Product[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Product[]): Product[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Product[]): Product[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        //case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
