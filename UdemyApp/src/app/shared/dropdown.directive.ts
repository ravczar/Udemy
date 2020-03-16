import { Directive, HostListener, HostBinding, Input, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit{
  @Input() wantedBgColor:string = "blue";
  @Input() defaultBgColor:string = "transparent";
  @HostBinding('class.open') isOpen:boolean;
  @HostBinding('style.backgroundColor') bgColor:string;


  constructor(private elRef: ElementRef) { }

  ngOnInit():void{
    this.isOpen = false;
    this.bgColor = this.defaultBgColor;
  }

  //Attach class to btn-group
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }

  //Change color of BG
  @HostListener('mouseenter')mouseover(event:Event){
    this.bgColor = this.wantedBgColor;
  }

  //CHange bg color back to default
  @HostListener('mouseleave')mouseleave(event:Event){
    this.bgColor = this.defaultBgColor;
  }



}
