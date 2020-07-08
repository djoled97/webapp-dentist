import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientService } from '../../service/patient.service';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-add-category-dialog',
  templateUrl: './add-category-dialog.component.html',
  styleUrls: ['./add-category-dialog.component.css']
})
export class AddCategoryDialogComponent implements OnInit {
  
  addForm=this.fb.group({
    ime:['', [Validators.required, Validators.minLength(2)]],
  })
  

  constructor(private fb:FormBuilder,private categoryService:CategoryService, private toastr:ToastrService) { }

  ngOnInit(): void {
    
  }
  
  onSubmit(){
    this.categoryService.addCategory(this.addForm.value).subscribe( ()=>{
      this.toastr.success('Category added successfully','',{
        closeButton:true,
        timeOut:2000

      }).onHidden.subscribe(()=>{
        window.location.reload();
      })
    })
  }
}
