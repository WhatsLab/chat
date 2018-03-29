import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-placeholder',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.scss']
})
export class PlaceholderComponent implements OnInit {

  @Input() data;
  screen = 'conversations';

  constructor() {
  }

  ngOnInit() {
    this.screen = this.data;
  }

}
