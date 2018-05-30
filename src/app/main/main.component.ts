import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @Output() isLoggedEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
    this.isLoggedEmitter.emit(true);
  }

  ngOnInit() {
  }

}
