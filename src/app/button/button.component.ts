import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})

export class ButtonComponent implements OnInit {

  @Input() loading: boolean;
  @Input() invalid: boolean;
  @Input() label: string;
  @Input() loadingLabel: string;
  constructor() {
  }

  ngOnInit() {
  }

}
