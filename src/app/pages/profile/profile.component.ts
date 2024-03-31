import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  profileForm!: FormGroup;

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.profileForm = this.fb.group({
      email: [null, Validators.required, Validators.email],
      fullName: [null, Validators.required],
      phoneNumber: [null, Validators.required],
    });
  }
}
