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
import { Tree } from '../tree';


declare const d3: any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, AfterViewInit, OnDestroy {
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;
  allTrees: Tree[];
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
        this.allTrees.forEach((tree, index) => this.renderTree(tree, index, this.allTrees[0].users))
        console.log("didnt crash yet")
    })
//it should start failing from here
    this.dataSubscription = this.data_service.tree_data.subscribe((result) => {
      this.allTrees = result.sort((a, b) => b.nodes.length - a.nodes.length)// why is this not failing
      if (result.length > 0) {
        console.log("data arrived ")
        this.reload.next("reload baby")
        console.log("reload done")
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
  renderTree(tree, index, users_list): void {

    var dims = { height: 1000, width: 2000 };
    d3.select("#canvas-" + index).selectAll("*").remove()
    console.log("removed svg ")

    //https://www.w3schools.com/jsref/dom_obj_all.asp
    try{
      var scale = d3.scaleOrdinal(d3["schemeSet3"])// share scale between different types of trees
      .domain(users_list.sort())
      var graph = this.tree_service.generateTree(users_list, tree.nodes, window.innerWidth * 0.97, window.innerHeight, scale);
      var graph_blobs = this.tree_service.generateBlobTree(users_list, tree.blobs, window.innerWidth *0.97, window.innerHeight,scale);

      console.log("adding svg ")
      var svg = d3.select("#canvas-" + index).append("svg")
      .attr('width', window.innerWidth)
      .attr('height', window.innerHeight * 0.80);

  svg.append(() => graph.node()).attr('transform', d => `translate(${10}, ${15})`);
  svg.append(() => graph_blobs.node()).attr('transform', d => `translate(${10}, ${15})`);

  console.log("dunno")
    }

    catch (e){
console.log("failed to draw a tree: ", e.message)
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
