import {Directive, ElementRef, Input, OnChanges, OnInit} from '@angular/core';
import * as moment from 'moment';

@Directive({
  selector: '[appDatetimeAgo]'
})
export class DatetimeAgoDirective implements OnInit {

  @Input() lastMessage: any;

  constructor(private element: ElementRef) {
//    console.log(this.lastMessage);
  }

  ngOnInit() {

    let timer = null;
    const _this = this;
    (function updateToNow() {
      if (!_this.lastMessage || !_this.lastMessage.creation) {
        if (timer) {
          clearTimeout(timer);
        }
        return;
      }
      _this.element.nativeElement.innerHTML = moment(_this.lastMessage.creation).toNow();
      timer = setTimeout(updateToNow, 60000);
    })();

  }

}
