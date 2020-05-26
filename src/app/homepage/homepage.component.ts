import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AuthenticationService } from '../authentication.service';
import { User } from '../user';
import { RegisterComponent } from '../register/register.component';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, AfterViewInit{
  constructor(public dialog: MatDialog, public auth: AuthenticationService) { }
  user: User

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result, " this is the result");

    });
  }
  openRegDialog():void{
    const regDialog = this.dialog.open(RegisterComponent,{
      width: '250px',
      data: {}
    })
  }
logout():void{
  this.auth.logout()
}

  ngOnInit(): void {
    //this.auth.user.next({username: "cumLord"})
      this.auth.get_user();

      this.auth.user.subscribe((result)=> {
        this.user = result

      }
        )


  }

  ngAfterViewInit(): void {

  }

}
