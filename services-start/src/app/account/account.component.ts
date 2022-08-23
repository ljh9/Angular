import { Component, Input } from '@angular/core';
import { AccountsService } from '../accounts.service';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  // providers: [LoggingService]
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;

  constructor(private logginhService: LoggingService, 
    private accountsService: AccountsService){ }

  onSetTo(status: string) {
    this.accountsService.updateState(this.id, status);
    // this.logginhService.logStatusChange(status);
    this.accountsService.statusUpdated.emit(status);
  }
}
