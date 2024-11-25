/*import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../../services/item.service';  // Make sure this path is correct

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css'],
})
export class ItemFormComponent {
  item = {
    name: '',
    description: '',
    price: 0,
  };

  constructor(private itemService: ItemService, private router: Router) {}

  saveItem(): void {
    this.itemService.addItem(this.item).subscribe(() => {
      this.router.navigate(['/']); // Navigate back to the item list after saving
    });
  }

  onCancel(): void {
    this.router.navigate(['/']); // Navigate back to the item list
  }
}*/
