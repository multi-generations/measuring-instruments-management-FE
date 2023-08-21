import {AfterViewChecked, Component} from '@angular/core';
import {AuthService} from "./module/feature/login/service/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked {
  isLogged = true;

  constructor(private _authService: AuthService) {
    // this.isLogged = this._authService.getToken() !== null;
  }

  ngAfterViewChecked(): void {
    // this.isLogged = this._authService.getToken() !== null;
  }
}
