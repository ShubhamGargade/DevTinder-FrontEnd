import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Store } from '@ngrx/store';
import { addUser } from '../../appStore/store.action';
import { userState } from '../../appStore/store.state';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginFormBuilder: FormBuilder = new FormBuilder();
  loginForm: FormGroup;
  loggedInUserData: Object = {};
  errorMessage: string = '';

  constructor(
    private apiService: ApiService,
    private router: Router,
    private store: Store<userState>
  ){
    this.loginForm = this.loginFormBuilder.group({
      emailId: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  logInUser(){
    this.apiService.loggedInUserAPI(this.loginForm.value).subscribe({
      next: (res: any) => {
        this.loggedInUserData = res['data'];
        if(this.loggedInUserData){
          this.store.dispatch(addUser({user: this.loggedInUserData}));
          this.router.navigateByUrl('/feed');
        }
      },
      error: (error) => {
        this.errorMessage = error.error;
      }
    })
  }
}
