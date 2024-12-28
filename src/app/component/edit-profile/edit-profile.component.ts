import { Component, input, InputSignal, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { State, Store } from '@ngrx/store';
import { userState } from '../../appStore/store.state';
import { ApiService } from '../../services/api.service';
import { addUser } from '../../appStore/store.action';
import { Router } from '@angular/router';
import { delay, of } from 'rxjs';
import { UserCardComponent } from "../user-card/user-card.component";

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [ReactiveFormsModule, UserCardComponent],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent implements OnInit {

  isEditProfile: InputSignal<boolean> = input(true);

  editProfileFormBuilder: FormBuilder = new FormBuilder();
  editProfileForm: FormGroup;
  errorMessage: string = '';
  userData: any;
  isDataSaved: boolean = false;
  alertMessage: string = "";

  constructor(
    private state: State<userState>,
    private store: Store<userState>,
    private apiService: ApiService,
    private route: Router
  ) {
    this.editProfileForm = this.editProfileFormBuilder.group({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      gender: new FormControl(''),
      photoUrl: new FormControl(''),
      age: new FormControl(''),
      about: new FormControl(''),
    });
  }

  ngOnInit(): void {
    if(this.isEditProfile()){
      this.state.subscribe({
        next: (res) => {
          this.userData = res.user.user;
          this.editProfileForm.patchValue({
            firstName: this.userData['firstName'],
            lastName: this.userData['lastName'],
            photoUrl: this.userData['photoUrl'],
            gender: this.userData['gender'],
            age: this.userData['age'],
            about: this.userData['about'],
          });
        },
        error: (error) => {
          console.error("Error getting user state in edit profile", error.error);
        }
      });
    }
    else if(!this.isEditProfile()){
      this.editProfileForm.addControl('emailId', new FormControl('', [Validators.required]));
      this.editProfileForm.addControl('password', new FormControl('', [Validators.required]));
    }
  }

  saveProfile() {
    if(this.isEditProfile()){
      const { age, about, skills, photoUrl } = this.editProfileForm.value;
      this.apiService.editUserProfile({ age, about, skills, photoUrl }).subscribe({
        next: (res) => {
          this.store.dispatch(addUser({ user: this.editProfileForm.value }));
          this.isDataSaved = true; 
          this.alertMessage = "User data edited successfully."
          of(!this.isDataSaved).pipe(delay(2000)).subscribe(
            (res) => { 
              this.isDataSaved = res;
              this.route.navigateByUrl('/feed'); 
            });
        },
        error: (error) => {
          console.log('Error in editing user data.', error.error);
        }
      });
    }
    else{
      const userData = this.editProfileForm.value;
      this.apiService.signInUser(userData).subscribe({
        next: (res) => { 
          this.isDataSaved = true;
          this.alertMessage = "User Created Successfully, Please Login to continue."
          of(!this.isDataSaved).pipe(delay(2000)).subscribe(
            (res) => { 
              this.isDataSaved = false;
              this.route.navigateByUrl('/login'); 
            });
        },
        error: (error) => {
          console.log('Error in signin of user.', error.error);
        }
      })
    }
  }
}
