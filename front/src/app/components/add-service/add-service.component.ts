import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/service/category.service';
import { ServicesService } from 'src/app/service/services.service';
import { Category } from 'src/app/models/Category'
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryDialogComponent } from '../add-category-dialog/add-category-dialog.component';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {
  kategorija:{
    id: number,
    ime: string,
  }[]


  serviceForm = this.fb.group({
    kataloskiBroj: ['', [Validators.required]],
    nazivUsluge: ['', [Validators.required,Validators.minLength(2)]],
    opis: ['', [Validators.required, Validators.minLength(15)]],
    cenaJedan: ['', [Validators.required]],
    cenaPaket: ['', [Validators.required]],
    cenaUzrast: ['', [Validators.required]], 
    kategorijaId:['']
  })
  constructor(private fb: FormBuilder, private service:ServicesService, private categoryService:CategoryService
   ,private toastr:ToastrService, private dialog: MatDialog
    ) {
    this.categoryService.getCategoryName().subscribe(data=>{
       this.kategorija=data;
    })
   }
 
  ngOnInit(): void {
   
  }


  onSubmit() {
  return  this.service.addService(this.serviceForm.value).subscribe( () =>{
    this.toastr.success('Service added','',{
      closeButton:true
    });
    this.serviceForm.reset();
    
  });
  
  }

  openDialog() {
    const dialog = this.dialog.open(AddCategoryDialogComponent);
  }

  
}
