import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject, Subscription } from 'rxjs';
import { Node } from './node';
declare const ReconnectingWebSocket: any;
@Injectable({
  providedIn: 'root'
})





export class DataReceptionService {
  public tree_data = new BehaviorSubject<Node[][]>([])
  constructor() { }

  createConnection() {
    var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
    var ws_path = ws_scheme + '://' + "127.0.0.1:8000" + "/treeChannel/"
    var socket = new ReconnectingWebSocket(ws_path)
    console.log("Connecting to " + ws_path);
    //let socket = new WebSocket("wss://limitless-wildwood-61701.herokuapp.com/treeChannel");
    let dis = this
    socket.onmessage = (event) => {
      this.tree_data.next(JSON.parse(event.data))
      console.log(this.tree_data.value, " coming from service")
      //update.apply(this)
    };
  }
}


