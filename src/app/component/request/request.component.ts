import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { delay, of } from 'rxjs';

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [],
  templateUrl: './request.component.html',
  styleUrl: './request.component.scss'
})
export class RequestComponent implements OnInit {

  requestData: any[] = [];
  isRequestSend: boolean = false;
  alertMessage: string = '';

  constructor(private apiService: ApiService){

  }

  ngOnInit(): void {
    this.apiService.getRequests().subscribe({
      next: (res: any) => {
        this.requestData = res.data;
      },
      error: (error) => {
        console.error('Error getting Request Data', error);
      }
    });
  }

  requestAction(requestStatus: string, requestId: string) {
    this.apiService.requestAction(requestStatus, requestId).subscribe({
      next: (res: any) => {
        this.isRequestSend = true;
        this.alertMessage = (requestStatus === 'accepted') ? "Connections request accepted." : "Connections request rejected.";
        of(!this.isRequestSend).pipe(delay(2000)).subscribe({
          next: (res) => {
            this.requestData = this.requestData.filter((r) => r._id !== requestId);
            this.isRequestSend = res;
          }
        });
      },
      error: (error) => {
        console.error('Error for request action', error);
      }
    })
  }
}
