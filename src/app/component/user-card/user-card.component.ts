import { Component, input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Store } from '@ngrx/store';
import { removeUserFromFeed } from '../../appStore/store.action';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  userData: any = input();

  constructor(private apiService: ApiService,
    private store: Store
  ){

  }

  feedAction(actionStatus: string, userId: string){
    this.apiService.feedAction(actionStatus, userId).subscribe({
      next: (res) => {
        this.store.dispatch(removeUserFromFeed({_id: userId}));
      },
      error: (error) => {
        console.error('Error on feed action', error);
      }
    });
  }
}
