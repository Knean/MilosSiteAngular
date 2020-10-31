import { Injectable } from '@angular/core';
import { User } from './user';
import { Node } from './node';
/* declare const d3:any; */
import * as d3 from 'd3'
@Injectable({
  providedIn: 'root'
})
export class TreeGeneratorService {

  constructor() { }

  public generateTree(users:User[], data:Node[], width, height):any{
    d3.create
    var height:any = height - 200
    //add the group element that will contain all the drawings of the graph
    //graph = svg.append('g').attr('transform', 'translate(50, 50)');
    users = users.sort((a,b) => a.username.localeCompare(b.username))
    console.log(users, "users ")
    var graph = d3.create('svg:g');
    var scale;
    scale = d3.scaleOrdinal(d3["schemeSet3"])
      .domain(users.map((element) => element.username))

    graph.selectAll('.node').remove();
    graph.selectAll('.link').remove();


    data.sort((a, b) => a.number - b.number)

    let even = data.filter((a)=>a.number%2 == 0).sort((a,b)=>b.number - a .number)
    let odd = data.filter((a)=>a.number%2 == 1).sort((a,b)=>a.number - b .number)

    data = even.concat(odd)

/*
    data.sort((a, b) => a.number % 2 == 0 ?  b.number - a.number:0)

    data.sort((a, b) => a.number % 2 == 1 ? a.number - b.number:0)
 */



    console.log(data, " data that is not sorted")
    // this is broken !! sort on the serverside
    // stratify the data
    var rootNode = d3.stratify()
      .id(function (d:any) {
        return d.number
      })
      .parentId(function (d:any) {
        return d.parent;
      })
      (data)
    //stratified data -> tree form data

    //var treeData = d3.tree().size([width * 0.97, height*0.75])(rootNode)

    //create the selection of nodes from the tree data descendants
/*
    var nodes = graph.selectAll('.node')
      .data(treeData.descendants())
 */
var nodes = graph.selectAll('.node')
.data(data)

/*
var nodes2 = graph.selectAll('.node')
.data(treeData.descendants())
 */

    // save the links data from the stratified data
    var links = graph.selectAll('.link').data(rootNode.links())

    // draw the links as path elements
    links.enter().append('path')
      .attr('stroke', 'blue')
      .attr('d', d3.linkVertical()
        .x(function (d) { return d.data.x * width})
        .y(function (d) { return d.data.y * height }))
      .attr('class', 'link')
      .attr('fill', 'none')
      .attr('stroke', d => d.target.data.hasOwnProperty('userName') ? scale(d.source.data.userName) : 'gray')////#aaa
      .attr('stroke-width', 2)

    // add a group for each node with the specified coordinates
    var enterNodes = nodes.enter().append('g')
      .attr('transform', (d, i, n) => {
        //rotates the tree
        let x = d.x *width
        let y = d.y * height
        return `translate(${x},${y})`
      })
      .attr('class', "node")

    // draw rectangles in each node group
    var rectangles = enterNodes.append('rect')
      .attr('fill', d => d.userName != null ? scale(d.userName) : 'gray')
      .attr('stroke', 'black')
      .attr('width', 30)//30
      .attr('height', 30)
      .attr('transform', d => `translate(${-5}, ${-10})`).raise();
    // add a click event on each rectangle
    enterNodes.on("click", (d) => {
      console.log(d)
    })
    enterNodes.on("mouseenter", (d) => {

    })
    // add text to each of the node groups
    enterNodes.append('text')
      .text((d) => { return d.number })
      .attr('fill', d => d.childrenMissing > 0 ? 'black' : "red")
      .attr('transform', d => `translate(${2}, ${10})`);

    var colorLegend = d3.legendColor()
      .shape("path", d3.symbol().type(d3.symbolTriangle).size(150)())
      .shapePadding(10)
      //use cellFilter to hide the "e" cell
      .cellFilter(function (d) { return d.label !== "e" })
      .scale(scale)

    graph.append("g")
      .attr("class", "userLegend")
    graph.select(".userLegend").call(colorLegend)

    return graph
  }
}
