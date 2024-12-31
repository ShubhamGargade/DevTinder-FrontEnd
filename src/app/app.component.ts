import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { FooterComponent } from './component/footer/footer.component';
import { ApiService } from './services/api.service';
import { Store } from '@ngrx/store';
import { addUser } from './appStore/store.action';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'DevTinder-FrontEnd';

  constructor(
    private apiService: ApiService,
    private router: Router,
    private store: Store
  ){}

  ngOnInit(): void {
    this.apiService.getUserProfile().subscribe({
      next: (res) => {
        if (res) {
          this.store.dispatch(addUser({ user: res }));
          // this.router.navigateByUrl('/feed');
        }
      },
      error: (error) => {
        console.log('Error to get the validate user: ', error.error);
        this.router.navigateByUrl('/login');
      }
    })
  }
}
