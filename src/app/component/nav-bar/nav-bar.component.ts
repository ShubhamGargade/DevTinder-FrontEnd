import { Component, OnInit } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { userState } from '../../appStore/store.state';
import { ApiService } from '../../services/api.service';
import { Router, RouterLink } from '@angular/router';
import { removeUser } from '../../appStore/store.action';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {
  userData:any

  isLoggedIn: boolean = false;

  constructor(private state: State<userState>,
    private store: Store<userState>,
    private apiService: ApiService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.state.subscribe({
      next: (res) => {
        console.log('SATE', res)
        if(Object.keys(res.user.user).length > 0){
          this.isLoggedIn = true;
          this.userData = res.user;
        }
        else{
          this.isLoggedIn = false;
        }
      },
      error: (error) => {
        console.error('Error to get user state', error);
      }
    })
  }

  logOutUser(){
    this.apiService.logOutUser().subscribe({
      next: (res) => {
        this.store.dispatch(removeUser());
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        console.log('Error logging out user', err)
      },
    })
  }
}
