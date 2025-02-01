import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <h1 class="text-3xl font-bold text-blue-500">Tailwind is working!</h1>
    <p>{{ message }}</p>
  `
})
export class AppComponent implements OnInit {
  message = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<{ message: string }>('/api/test').subscribe({
      next: (response) => this.message = response.message,
      error: (error) => console.error('Error fetching API:', error)
    });
  }
}
