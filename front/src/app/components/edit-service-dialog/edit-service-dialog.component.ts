import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientService } from '../../service/patient.service';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { ServicesService } from 'src/app/service/services.service';
import { CategoryService } from 'src/app/service/category.service'

@Component({
  selector: 'app-edit-service-dialog',
  templateUrl: './edit-service-dialog.component.html',
  styleUrls: ['./edit-service-dialog.component.css']
})
export class EditServiceDialogComponent implements OnInit {
  service:{
    id: number,
    kataloskiBroj: number,
    naziv: string,
    opis: string
  }[];

  id:number;
  editForm=this.fb.group({
    nazivUsluge:['',[Validators.required]],
    opis:['', [Validators.required]],
    kataloskiBroj:['',[Validators.required]],
    cenaJedan: ['', [Validators.required]],
    cenaPaket: ['', [Validators.required]],
    cenaUzrast: ['',[Validators.required]],
    kategorijaId:[''],
  })
  

  constructor(private fb:FormBuilder,private dialogRef: MatDialogRef<EditServiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,private servicesService:ServicesService, private categoryService: CategoryService
    ,private toastr:ToastrService) { 
     this.id=data.id;
     this.editForm.get('kataloskiBroj').setValue(data.kataloskiBroj);
     this.editForm.get('nazivUsluge').setValue(data.naziv);
     this.editForm.get('opis').setValue(data.opis);
     this.editForm.get('cenaJedan').setValue(data.cenaJedan);
     this.editForm.get('cenaPaket').setValue(data.cenaPaket);
     this.editForm.get('cenaUzrast').setValue(data.cenaUzrast);

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

      }).onHidden.subscribe(()=>{
        window.location.reload();
      })
    })
  }
}
