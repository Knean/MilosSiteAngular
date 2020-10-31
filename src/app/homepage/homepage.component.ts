import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AuthenticationService } from '../authentication.service';
import { User } from '../user';
import { RegisterComponent } from '../register/register.component';
import { PurchaseService } from '../purchase.service';
import { DataReceptionService } from '../data-reception.service';
import { Node } from '../node';
import { TreeGeneratorService } from '../tree-generator.service';
import { MDCTabBar } from '@material/tab-bar';
import { PurchaseComponent } from '../purchase/purchase.component';
import { Subject, BehaviorSubject, interval, Subscription } from 'rxjs';
import { debounce, skip, throttle, delay } from 'rxjs/operators';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

import * as d3 from 'd3'
/* declare const d3: any; */

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, AfterViewInit, OnDestroy {
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;
  allTrees: Node[][] = []
  user: User;
  users: User[]
  index: number = 0
  dataSubscription: Subscription

  task: any;

  public reload: Subject<any>
  constructor(
    public dialog: MatDialog,
    public auth: AuthenticationService,
    public purchase: PurchaseService,
    public data_service: DataReceptionService,
    public tree_service: TreeGeneratorService,


  ) { }
  @HostListener('window:resize', ['$event'])
  dostuff() {
        //this.allTrees.forEach((tree, index)=>this.renderTree(this.allTrees[index],index))
        console.log("reload triggered by window size change")
        this.reload.next("oh yea")
      }

/*
//.pipe(
  throttle(ev => interval(2000), { leading: true, trailing: true }),
  ) */

  ngOnInit(): void {


    this.reload = new Subject()
    //.pipe(debounce(() => interval(2000)))
    this.reload.pipe(debounce(() => interval(500))).subscribe(() => {
     // d3.selectAll(".genericClass").select("svg").remove();
        console.log("reload after debounce")
        this.allTrees.forEach((tree, index) => this.renderTree(tree, index))
    })

    this.dataSubscription = this.data_service.tree_data.subscribe((result) => {
      this.allTrees = result.sort((a, b) => b.length - a.length)
      if (result.length > 0) {
        console.log("data arrived ")
        this.reload.next("reload baby")
      }
    })

      //this.auth.user.next({username: "cumLord"})
    this.auth.get_user();
    this.auth.user.subscribe((result) => {
      this.user = result
    })
    this.auth.userList.subscribe(dataResponse => {
      this.users = dataResponse
    })
  }


  tabs: any[] = [
    {
      selected: true,
      name: "First Tree"
    },
    {
      selected: false,
      name: "Second Tree"
    },
    {
      selected: false,
      name: "Third Tree"
    },
    {
      selected: false,
      name: "Fourth Tree"
    },
    {
      selected: false,
      name: "Fifth Tree"
    },
  ]

  selectTab(index) {
    this.tabs.forEach(tab => tab.selected = false)
    this.tabs[index].selected = true
    //this.loading= false;
  }
  renderTree(data, index): void {

    var dims = { height: 1000, width: 2000 };
    d3.select("#canvas-" + index).selectAll("*").remove()
    console.log("removed svg ")

    //https://www.w3schools.com/jsref/dom_obj_all.asp
    try{
      var graph = this.tree_service.generateTree(this.users, data, window.innerWidth, window.innerHeight);
      console.log("adding svg ")
      var svg = d3.select("#canvas-" + index).append("svg")
      .attr('width', window.innerWidth)
      .attr('height', window.innerHeight * 0.80);

  svg.append(() => graph.node()).attr('transform', d => `translate(${10}, ${15})`);
    }

    catch{

    }






  }

  delete() {
    this.purchase.reset();

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  openRegDialog(): void {
    const regDialog = this.dialog.open(RegisterComponent, {
      width: '250px',
      data: {}
    })
  }

  purchaseDialog(): void {
    let Dialog = this.dialog.open(PurchaseComponent, {
      width: 'auto',
      data: {}
    })
  }
  logout(): void {
    this.auth.logout()
  }
  nameFunction() {
    return "a name"
  }


  ngAfterViewInit(): void {




    this.data_service.task_data.subscribe((result) => {

      this.task = result
      //this.taskFraction = result.fraction * 100

    })
    this.data_service.createConnection()


  }
ngOnDestroy():void{
  this.dataSubscription.unsubscribe()
}

}
