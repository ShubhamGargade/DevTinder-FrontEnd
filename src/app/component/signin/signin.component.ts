import { Component } from '@angular/core';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [EditProfileComponent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {

}
