import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientService } from '../../service/patient.service';
import { UserService } from '../../service/user.service';
import { ToastrService } from 'ngx-toastr';
import { ServicesService } from '../../service/services.service';
import { CategoryService } from '../..//service/category.service'

@Component({
  selector: 'app-edit-service-dialog',
  templateUrl: './edit-service-dialog.component.html',
  styleUrls: ['./edit-service-dialog.component.css']
})
export class  EditServiceDialogComponent implements OnInit {
  service:{
    id: number,
    kataloskiBroj: number,
    naziv: string,
    opis: string
  }[];

  id:number;
  editForm=this.fb.group({
    nazivUsluge:['',[Validators.required, Validators.minLength(2)]],
    opis:['', [Validators.required, Validators.minLength(5)]],
    kataloskiBroj:['',[Validators.required, Validators.pattern(/^[0-9]*$/)]],
    cenaJedan: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
    cenaPaket: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
    cenaUzrast: ['',[Validators.required, Validators.pattern(/^[0-9]*$/)]],
    kategorijaId:[''],
  })
  

  constructor(private fb:FormBuilder,private dialogRef: MatDialogRef<EditServiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,private servicesService:ServicesService, private categoryService: CategoryService
    ,private toastr:ToastrService) { 
     console.log(data);
      this.id=data.service.uslugaId;
     this.editForm.get('kataloskiBroj').setValue(data.service.kataloskiBroj);
     this.editForm.get('nazivUsluge').setValue(data.service.nazivUsluge);
     this.editForm.get('opis').setValue(data.service.opis);
     this.editForm.get('cenaJedan').setValue(data.service.cena.cenaJedan);
     this.editForm.get('cenaPaket').setValue(data.service.cena.cenaPaket);
     this.editForm.get('cenaUzrast').setValue(data.service.cena.cenaUzrast);
     this.editForm.get('kategorijaId').setValue(data.service.kategorija.kategorijaId);
    }

  ngOnInit(): void {
    this.categoryService.getCategoryName().subscribe(data =>{
      this.service=data;
    })
  }

  onSubmit(){
    this.servicesService.editService(this.id,this.editForm.value).subscribe( ()=>{
      this.toastr.success('Service edited successfully','',{
        closeButton:true,
        timeOut:2000

      })
    })
  }
}
