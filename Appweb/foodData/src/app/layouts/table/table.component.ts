import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() data: any;
  ngOnInit(): void {

  }

  getKeys(obj: any) {
    return Object.keys(obj);
  }
  getValue(obj: any): any {
    return Object.values(obj);
  }

  getAllKey(obj: any) {
    let key: Array<string> = []
    for (let ob of obj) {
      let ke = Object.keys(ob);
      for (let k of ke) {
        if (key.includes(k)) {
        } else {
          key.push(k);
        }
      }

    }
    return key;
  }
}
