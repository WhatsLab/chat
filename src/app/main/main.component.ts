import {Component, OnInit} from '@angular/core';
import {EventBrokerService} from '../event-broker.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {


  constructor(private _eventBroker: EventBrokerService) {
    this._eventBroker.emit<boolean>('is-logged', true);
  }

  ngOnInit() {
  }

}
