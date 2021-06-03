import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category = {
    title: '',
    description: ''
  };

  constructor(private _category: CategoryService, private _snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  formSubmit() {
    if (this.category.title.trim() == '' || this.category.title == null) {
      this._snackbar.open("Title is required !", '', {
        duration: 3000
      });
      return;
    }
    if (this.category.description.trim() == '' || this.category.description == null) {
      this._snackbar.open("Description is required !", '', {
        duration: 3000
      });
      return;
    }
    //if everything perfect
    this._category.addCategory(this.category).subscribe(
      (data: any) => {
        console.log(data);
        this.category.title = '';
        this.category.description = '';
        swal('Success !!', 'Category is added successfully.', 'success');
      },
      (error) => {
        console.log(error);
        swal('Error !!', 'Server error.', 'error');
      }
    )
  }

}
