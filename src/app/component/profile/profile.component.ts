import { Component } from '@angular/core';
import { EditProfileComponent } from "../edit-profile/edit-profile.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [EditProfileComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

}
