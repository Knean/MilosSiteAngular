import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private http: HttpClient, private auth: AuthenticationService) { }

  purchase(amount) {
    let csrf = this.auth.getCookie('csrftoken')

    let csrfheader = new HttpHeaders({ 'X-CSRFToken': csrf })
    console.log(this.auth.getHost() + "tree/buy/")
    this.http.post(this.auth.getHost() + "tree/buy/", { "amount": amount}, { headers: csrfheader })
      .subscribe(() => {})
  }

  reset(){
    this.http.get(this.auth.getHost() + "delete")
    .subscribe(() => {
      //nothing to do here
    })
  }
}
