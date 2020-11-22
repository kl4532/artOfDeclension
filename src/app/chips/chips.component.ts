import {Component, Input, OnInit} from '@angular/core';
import {Chip} from '../models/Chip';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss']
})
export class ChipsComponent implements OnInit {

  @Input() options: Chip[];
  @Input() disabled: false;
  constructor() { }

  ngOnInit(): void {
  }

}
