import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'basics-assignment-3-solution';
  showSecret = false;
  log = [];

  onToggleDetails(){
    this.showSecret = !this.showSecret;
    this.log.push(this.log.length + 1);
  }
}
