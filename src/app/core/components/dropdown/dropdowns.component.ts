import {Component, OnDestroy, Input} from '@angular/core';

@Component({
  selector: 'comp-dropdown',
  templateUrl: 'dropdowns.component.html'
})
export class CompDropdownsComponent implements OnDestroy {

  status: { isOpen: boolean } = { isOpen: false };
  disabled: boolean = false;
  isDropup: boolean = true;
  autoClose: boolean = false;

@Input() items: any[] = []

  constructor() { }

  ngOnDestroy () {
    this.status.isOpen = false;
  }

  onHidden(): void {
    console.log('Dropdown is hidden');
  }
  onShown(): void {
    console.log('Dropdown is shown');
  }
  isOpenChange(): void {
    console.log('Dropdown state is changed');
  }

  toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isOpen = !this.status.isOpen;
  }

  change(value: boolean): void {
    this.status.isOpen = value;
  }
}
