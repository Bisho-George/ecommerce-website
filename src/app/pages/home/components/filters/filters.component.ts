import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',

})
export class FiltersComponent {
  categories = ['shoes', 'sports'];
  @Output() categoryChange = new EventEmitter<string>();

  onShowCategory(category: string): void {
    this.categoryChange.emit(category);
  }
}
