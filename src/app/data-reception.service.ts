import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject, Subject, Subscription, } from 'rxjs';
import { Node } from './node';
import { AuthenticationService } from './authentication.service';
import { delay } from 'rxjs/operators';
declare const ReconnectingWebSocket: any;
@Injectable({
  providedIn: 'root'
})





export class DataReceptionService {
  public tree_data = new Subject<Node[][]>()
  public task_data = new BehaviorSubject<any>({})
  constructor(private auth: AuthenticationService) { }

  getSocketPath(): string{
    var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
    var host = window.location.host;
    if (host == "localhost:4200"){
      host = "127.0.0.1:8000"
    }
    var ws_path = ws_scheme + '://' + host + "/treeChannel/"
     /* var ws_path = "ws://limitless-wildwood-61701.herokuapp.com/treeChannel/" */
    return ws_path
  }

  createConnection() {


    var socket = new ReconnectingWebSocket(this.getSocketPath() + "tree/")
    console.log("Connecting to " + this.getSocketPath());
    //let socket = new WebSocket("wss://limitless-wildwood-61701.herokuapp.com/treeChannel");
    let dis = this
    socket.onmessage = (event) => {
      this.tree_data.next(JSON.parse(event.data))

      //update.apply(this)
    };

    var taskSocket = new ReconnectingWebSocket(this.getSocketPath() + "task/")
    console.log("Connecting to " + this.getSocketPath() + "task/");
    //let socket = new WebSocket("wss://limitless-wildwood-61701.herokuapp.com/treeChannel");

    taskSocket.onmessage = (event) => {
      this.task_data.next(JSON.parse(event.data))

      //update.apply(this)
    };

  }
}

//ws://127.0.0.1:8000/treeChannel/task/
