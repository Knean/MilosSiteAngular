import { Component, OnInit, AfterViewInit, AfterContentInit, Input } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { User } from '../user';
import { Node } from '../node';
import { TreeGeneratorService } from '../tree-generator.service';
declare const ReconnectingWebSocket: any;
declare const d3: any;


@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit, AfterViewInit {

  constructor(
    public auth: AuthenticationService,
    public tree_service: TreeGeneratorService) { }
  //public data: any[]
  public users: User[]
  update: void;
  name: string;
  @Input() data: Node[];
  @Input() index:number;

  ngOnInit(): void {
    console.log(this.data, " its the mofoking data")
    this.auth.userList.subscribe(dataResponse => {

      this.users = dataResponse


      console.log(this.users, "this is the users data form subscription")
    })
    this.name = this.data.length.toString()

  }
  ngAfterViewInit(): void {

    /* setTimeout(() => {
      var dims = { height: 1400, width: 800 };
      var svg = d3.selectAll(".canvas")
        .append('svg')
        .attr('width', dims.width + 100)
        .attr('height', dims.height + 100);
      var graph = this.tree_service.generateTree(this.users,this.data);
      console.log(graph.node(), " nodes")
      svg.append(()=>graph.node())
      svg.append(()=>graph.node())
    }, 0); */

  }

}
//setTimeout(() => {
/*   var graph
    var svg
    const dims = { height: 1400, width: 800 };
    svg = d3.selectAll(".canvas")
      .append('svg')
      .attr('width', dims.width + 100)
      .attr('height', dims.height + 100);
    //add the group element that will contain all the drawings of the graph

    //graph = svg.append('g').attr('transform', 'translate(50, 50)');
    var graph = d3.create('svg:g');
    var scale;
    scale = d3.scaleOrdinal(d3["schemeSet3"])
      .domain(this.users.map((element) => element.username))

    graph.selectAll('.node').remove();
    graph.selectAll('.link').remove();
    this.data.sort((a, b) => a.number - b.number)
    this.data.sort((a, b) => a.number % 2 == 1 ? a.number - b.number : b.number - a.number)
    console.log(this.data, "data before stratify")
    // stratify the data
    var rootNode = d3.stratify()
      .id(function (d) {
        return d.number
      })
      .parentId(function (d) {
        return d.parent;
      })
      (this.data)
    //stratified data -> tree form data
    var treeData = d3.tree().size([1400, 800])(rootNode)
    //create the selection of nodes from the tree data descendants
    var nodes = graph.selectAll('.node')
      .data(treeData.descendants())

    // save the links data from the stratified data
    var links = graph.selectAll('.link').data(rootNode.links())

    // draw the links as path elements
    links.enter().append('path')
      .attr('stroke', 'blue')
      .attr('d', d3.linkHorizontal()
        .x(function (d) { return d.y; })
        .y(function (d) { return d.x; }))
      .attr('class', 'link')
      .attr('fill', 'none')
      .attr('stroke', d => d.target.data.hasOwnProperty('userName') ? scale(d.source.data.userName) : 'gray')////#aaa
      .attr('stroke-width', 2)

    // add a group for each node with the specified coordinates
    var enterNodes = nodes.enter().append('g')
      .attr('transform', (d, i, n) => {
        //rotates the tree
        let x = d.y
        let y = d.x
        return `translate(${x},${y})`
      })
      .attr('class', "node")

    // draw rectangles in each node group
    var rectangles = enterNodes.append('rect')
      .attr('fill', d => d.data.userName != null ? scale(d.data.userName) : 'gray')
      .attr('stroke', 'black')
      .attr('width', 30)//30
      .attr('height', 30)
      .attr('transform', d => `translate(${-5}, ${-10})`).raise();
    // add a click event on each rectangle
    enterNodes.on("click", (d) => {
      console.log(d)
    })
    enterNodes.on("mouseenter", (d) => {
      console.log(d)
    })
    // add text to each of the node groups
    enterNodes.append('text')
      .text((d) => { return d.data.number })
      .attr('fill', d => d.data.childrenMissing > 0 ? 'black' : "red")
      .attr('transform', d => `translate(${2}, ${10})`);

    var colorLegend = d3.legendColor()
      .shape("path", d3.symbol().type(d3.symbolTriangle).size(150)())
      .shapePadding(10)
      //use cellFilter to hide the "e" cell
      .cellFilter(function (d) { return d.label !== "e" })
      .scale(scale)

    graph.append("g")
      .attr("class", "userLegend")
    graph.select(".userLegend").call(colorLegend) */

//svg.append(()=>graph.node())
//},0);

  //}


