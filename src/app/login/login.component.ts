import { Component, OnInit } from '@angular/core';
//import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  //public profileForm: FormGroup;

  profileForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  })
  constructor(
    private auth: AuthenticationService,
    private dialogRef: MatDialogRef<LoginComponent>,
  ) {}

  ngOnInit(): void {


  }



  save() {
    this.auth.login(
      this.profileForm.controls.username.value,
      this.profileForm.controls.password.value)

    this.dialogRef.close(this.profileForm.value);
  }

  cancel(){
    this.dialogRef.close()
  }
}
