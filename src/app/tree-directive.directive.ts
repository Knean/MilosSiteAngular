import { Directive, Input, Renderer2, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appTreeDirective]'
})
export class TreeDirectiveDirective implements OnInit {
@Input() treeData:any;
  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }
ngOnInit(): void{
  const div = this.renderer.createElement('div');
  //const text = this.renderer.createText('Hello world!');
this.renderer.setAttribute(div, "innerHtml","<p> hehe </p>")
  //this.renderer.appendChild(div, text);
  this.renderer.appendChild(this.elementRef.nativeElement, div)
}
}
