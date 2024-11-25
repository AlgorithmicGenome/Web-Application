/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; // Adjust path if necessary
import { Item } from '../models/item.model'; // Adjust path if necessary

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = `${environment.apiBaseUrl}/items`; // Your backend API URL

  constructor(private http: HttpClient) {}

  // Method to fetch items from the backend
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl); // Sends a GET request to the API
  }

  // Method to add a new item to the database
  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, item); // Sends a POST request to add the item
  }

  // Method to delete an item by ID
  deleteItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`); // Sends a DELETE request
  }
}*/
