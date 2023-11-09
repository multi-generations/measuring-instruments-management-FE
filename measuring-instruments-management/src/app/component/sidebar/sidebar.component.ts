import {Component} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  activeButtonId: string = 'instrument-management-sidebar'

  sidebarClick($event: MouseEvent) {
    const btnClicked = $event.target as HTMLElement;
    this.activeButtonId = btnClicked.id;
  }
}
