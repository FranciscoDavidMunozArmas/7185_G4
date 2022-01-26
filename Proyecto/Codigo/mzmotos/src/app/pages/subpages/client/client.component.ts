import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientFormComponent } from 'src/app/components/client-form/client-form.component';
import { ClientService } from 'src/app/services/client.service';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  
  @ViewChild("clientForm") clientForm: ElementRef;

  selected: any = null;
  editable: any = null;
  clients: any[] = [];

  constructor(
    private modalService: NgbModal,
    private clientService: ClientService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.clientService.getClients().subscribe(
      (data: any[]) => {
        this.clients = this.clients.concat(data.map(item =>{
          return item;
        }));
      });
  }

  submitData(data: any) {
    console.log(data);
    if (!!this.editable) {
      this.editData(data);
    } else {
      this.clients.push(data);
    }
    this.modalClose();
  }

  editData(data: any) {
    this.clients = this.clients.map(item => {
      if (item._id === this.editable._id) {
        return data;
      }
      return item;
    });
    this.modalClose();
  }

  onDelete(client: any) {
      this.clientService.deleteClientByID(client._id).subscribe(
        (data: any) => {
          this.clients = this.clients.filter(item => item._id !== client._id);
        }
      );
    this.unselectedClient();
  }

  onEdit(client: any) {
    this.editable = client;
    this.showClientForm();
  }

  selectedClient(client: any) {
    this.selected = client;
  }

  unselectedClient() {
    this.selected = null;
  }

  showClientForm() {
    this.triggerModal(this.clientForm);
  }

  triggerModal(content: any) {
    this.modalService.open(content).result;
  }

  modalClose() {
    this.modalService.dismissAll();
  }

}
