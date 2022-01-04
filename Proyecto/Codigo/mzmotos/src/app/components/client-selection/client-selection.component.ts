import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Client, clientConverter } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-selection',
  templateUrl: './client-selection.component.html',
  styleUrls: ['./client-selection.component.css']
})
export class ClientSelectionComponent implements OnInit {

  @Input() selectedClient: Client;
  @Output() closeEvent = new EventEmitter<any>();
  @Output() handleSelection = new EventEmitter<Client>();

  clients: Client[];
  searchResults: Client[];

  constructor(
    private service: ClientService,
  ) { }

  ngOnInit(): void {
    this.getClients();
  }

  getClients() {
    this.service.getClients()
    .subscribe(res => {
      if(res.length > 0) {
        this.clients = res.map(clientConverter.fromJSON);
      } else {
        this.clients = [];
      }
      this.searchResults = this.clients;
    });
  }

  searchClient(text: string) {
    const regexRUC = /^[0-9]{13}$/;
    const regexCI = /^[0-9]{10}$/;
    this.searchResults = [];
    if(regexRUC.test(text) || regexCI.test(text)) {
      this.clients.forEach((element: Client) => {
        if(element.RUC === text){
          this.searchResults.push(element);
        }
      });
    } else {
      this.searchResults = this.clients.filter((element: Client) => element.name === text)
    }
  }

  cancelSearch() {
    this.searchResults = this.clients;
  }

  handleSelectionClient(client: Client) {
    this.selectedClient = client;
    this.handleSelection.emit(client);
  }

  close() {
    this.closeEvent.emit();
  }

}
