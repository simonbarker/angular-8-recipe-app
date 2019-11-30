import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() tabSelectedEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onSelect(tabName: string) {
    this.tabSelectedEvent.emit(tabName);
  }

}
