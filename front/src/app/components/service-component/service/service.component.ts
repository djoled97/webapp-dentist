import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../../service/services.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EditServiceDialogComponent } from '../../edit-service-dialog/edit-service-dialog.component';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  constructor(private service: ServicesService, private fb: FormBuilder, public dialog: MatDialog,
    private toastr: ToastrService, private router: Router) { }

  services: any[];

  panelOpenState = false;

  searchForm = this.fb.group({
    keywords: ['']
  })
  

  ngOnInit(): void {
    this.service.getServices().subscribe(data => {
      console.log(data);
      this.services = data;
    })
  }

  openDialog(service: any) {
    console.log(service)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      
      service
    }
    const dialog = this.dialog.open(EditServiceDialogComponent, dialogConfig);
  }

  onSearch() {
    this.service.searchServices(this.searchForm.value).subscribe(data => {

      this.services = [];
      this.services = data;

      if (this.searchForm.value === '') {
        this.service.getServices().subscribe(data => {
          this.services = data;
        })
      } else if (data.statusCode === -3001) {
        this.services = [];
        this.toastr.error('Service not found', '', {
          closeButton: true,
          positionClass: 'toast-bottom-center'
        })
      }

    });
  }

  addUserNavigation() {
    this.router.navigate(['service/add']);
  }
}
