import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServicesService } from '../../service/services.service';
import { PatientService } from '../../service/patient.service';
import { InterventionService } from '../../service/intervention.service';
import { MatOption } from '@angular/material/core';
import { PriceService } from '../../service/price.service';
import { MatSelectChange } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-intervention-dialog',
  templateUrl: './add-intervention-dialog.component.html',
  styleUrls: ['./add-intervention-dialog.component.css']
})
export class AddInterventionDialogComponent implements OnInit {





  usluga: [];
  karton: [];


  addInterventionForm = this.fb.group({
    uslugaid: ['', [Validators.required]],
    kartonPacijentId: ['', [Validators.required]]
  })


  constructor(private toastr:ToastrService, private priceService: PriceService, private interventionService: InterventionService, private fb: FormBuilder, private servicesService: ServicesService, private patientService: PatientService) {

  }

  ngOnInit(): void {

    this.servicesService.getServices().subscribe(data => {
      this.usluga = data;
    });
    this.patientService.getPatients().subscribe(data => {
      this.karton = data


    })

  }
  onAddIntervention() {
    {
      if (this.addInterventionForm.valid) {
        this.interventionService.addIntervention(this.addInterventionForm.value).subscribe(()=>{
          this.toastr.success('Intervention  add success','',{
            closeButton:true,
            
            timeOut:2000
    
          }).onHidden.subscribe(()=>{
            window.location.reload();
          })
        });


      }
    }



  }





}
