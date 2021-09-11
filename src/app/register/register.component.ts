import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../user';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private auth: AuthenticationService,


    private dialogRef: MatDialogRef<RegisterComponent>,
  ) { }
  public users: User[]
  profileForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    password2: new FormControl(''),
  })
  save() {
    this.auth.register(
      this.profileForm.controls.username.value,
      this.profileForm.controls.password.value)

    this.dialogRef.close(this.profileForm.value);
  }

  cancel(){
    this.dialogRef.close()
  }
  selected = "option-1"
  ngOnInit(): void {
    this.auth.get_users()
    this.auth.userList.subscribe(dataResponse => {

      this.users = dataResponse


      console.log(this.users, "this is the users data form subscription")
    })
  }

}
