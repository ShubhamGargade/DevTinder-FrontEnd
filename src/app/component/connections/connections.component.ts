import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-connections',
  standalone: true,
  imports: [],
  templateUrl: './connections.component.html',
  styleUrl: './connections.component.scss'
})
export class ConnectionsComponent implements OnInit {
  
  connectionsData: any[] = [];

  constructor(private apiService: ApiService) {

  }

  ngOnInit(): void {
    this.apiService.getConnections().subscribe({
      next: (res: any) => {
        this.connectionsData = res.data;
      },
      error: (error) => {
        console.error('Error getting connections data', error);
      }
    })
  }
}
