import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { State, Store } from '@ngrx/store';
import { addFeed } from '../../appStore/store.action';
import { feedState } from '../../appStore/store.state';
import { UserCardComponent } from '../user-card/user-card.component';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [UserCardComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent implements OnInit {

  feedData: any[] = [];

  constructor(
    private apiService: ApiService,
    private store: Store,
    private state: State<feedState>
  ) { }

  ngOnInit(): void {
    this.state.subscribe({
      next: (res) => {
        if (res.feedData.feedData.length > 0) {
          this.feedData = res.feedData.feedData;
        }
        else {
          this.apiService.getFeedData().subscribe({
            next: (res: any) => {
              if(res['data'].length > 0){
                this.store.dispatch(addFeed({ feedData: res['data'] }));
                this.feedData = res['data'];
              }
              else{
                this.feedData = [];
              }
            },
            error: (error) => {
              console.log('Error to get the feed data', error);
            }
          });
        }
      },
      error: (error) => {
        console.log('Error in getting feed state', error);
      }
    });
  }
}
