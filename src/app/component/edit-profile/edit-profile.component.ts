import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
  editProfileFormBuilder: FormBuilder = new FormBuilder();
  editProfileForm: FormGroup;
  errorMessage: string = '';
  userData: any;
  isDataEdited: boolean = false;

  constructor(
    private state: State<userState>,
    private store: Store<userState>,
    private apiService: ApiService,
    private route: Router
  ) {
    this.editProfileForm = this.editProfileFormBuilder.group({
      firstName: new FormControl('s'),
      lastName: new FormControl(''),
      gender: new FormControl(''),
      photoUrl: new FormControl(''),
      age: new FormControl(''),
      about: new FormControl(''),
    });
  }

  ngOnInit(): void {
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
    })
  }

  saveProfile() {
    const { age, about, skills, photoUrl } = this.editProfileForm.value;
    this.apiService.editUserProfile({ age, about, skills, photoUrl }).subscribe({
      next: (res) => {
        this.store.dispatch(addUser({ user: this.editProfileForm.value }));
        this.isDataEdited = true; 
        of(!this.isDataEdited).pipe(delay(2000)).subscribe(
          (res) => { 
            this.isDataEdited = res;
            this.route.navigateByUrl('/feed'); 
          });
      },
      error: (error) => {
        console.log('Error in editing user data.', error.error)
      }
    });
  }
}
