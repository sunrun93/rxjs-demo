import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(){
    console.log('ApiUrl: '+ environment.apiUrl);
  }
  title = 'rxjs-demo';
}
