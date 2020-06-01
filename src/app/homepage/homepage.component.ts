import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
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

declare const d3: any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, AfterViewInit {

  constructor(
    public dialog: MatDialog,
    public auth: AuthenticationService,
    public purchase: PurchaseService,
    public data_service: DataReceptionService,
    public tree_service: TreeGeneratorService
  ) { }
  @HostListener('window:resize', ['$event'])
  dostuff(){
    console.log( "resized")
    this.loading = true
    setTimeout(() => {
      d3.selectAll("svg").remove();
      this.allTrees.forEach((tree, index)=>this.renderTree(this.allTrees[index],index))
      this.loading = false;
    }, 200);
  }
  allTrees: Node[][] = []
  user: User;
  users: User[]
  index: number = 0
  loading: boolean = true;

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
    this.loading = true;
    setTimeout(() => {
      this.tabs.forEach(tab=>tab.selected = false)
      console.log(this.tabs[index].name)
      this.tabs[index].selected = true
      this.loading = false
    }, 0);

      //this.loading= false;


  }
  renderTree(data, index): void {
    console.log("#canvas-"+ index)

      var dims = { height: 1000, width: 2000 };

      var svg = d3.select("#canvas-"+ index)
        .append('svg')
        .attr('width', window.innerWidth)
        .attr('height', window.innerHeight*0.80);
      //https://www.w3schools.com/jsref/dom_obj_all.asp
      var graph = this.tree_service.generateTree(this.users, data, window.innerWidth, window.innerHeight);
      svg.append(() => graph.node()).attr('transform', d => `translate(${10}, ${15})`);

    console.log(svg.empty())

  }

delete(){
  this.purchase.reset();
}

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result, " this is the result");

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

/*   buy(amount): void {
    this.purchase.purchase(amount)
  } */
  nameFunction() {
    return "a name"
  }
  ngOnInit(): void {


    //this.auth.user.next({username: "cumLord"})
    this.auth.get_user();

    this.auth.user.subscribe((result) => {
      this.user = result
    })
    this.auth.userList.subscribe(dataResponse => {
      this.users = dataResponse
    })
  }

  ngAfterViewInit(): void {


    this.data_service.createConnection()
    this.data_service.tree_data.subscribe((result) => {
      this.loading = true;

      this.allTrees = result
      //this.renderTree(this.allTrees[this.index])
      d3.selectAll("svg").remove();
      setTimeout(() => {
        result.forEach((tree, index)=>this.renderTree(this.allTrees[index],index))
        this.loading = false;
      }, 200);

      //



    })
  }

}
