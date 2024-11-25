/*
import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.model'; // Adjust the path if necessary

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent implements OnInit {
  items: Item[] = []; // Holds the list of items
  isLoading: boolean = false; // Indicates loading state

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.fetchItems(); // Fetch items when the component is initialized
  }

  fetchItems(): void {
    this.isLoading = true; // Set loading state to true while fetching
    this.itemService.getItems().subscribe(
      (data) => {
        this.items = data;
        this.isLoading = false; // Set loading state to false when done
      },
      (error) => {
        console.error('Error fetching items:', error);
        this.isLoading = false; // Stop loading even in case of an error
      }
    );
  }


}
*/
