import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appDefaultImg]'
})
export class DefaultImgDirective {


  defaultImg = '../assets/images/avatars/default.png';


  @HostListener('error') onError() {
    this.el.nativeElement.src = this.defaultImg;
  }


  constructor(private el: ElementRef) {
  }


}
