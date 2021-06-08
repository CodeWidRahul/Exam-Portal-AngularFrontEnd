import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  cid = 0;
  category = {
    title: '',
    description: ''
  };

  constructor(
    private _route: ActivatedRoute,
    private _category: CategoryService,
    private _snackbar: MatSnackBar,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.cid = this._route.snapshot.params.cid;
    console.log(this.cid);
    this._category.getCategory(this.cid).subscribe(
      (data: any) => {
        console.log(data);
        this.category = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateCategory() {
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
    this._category.updateCategory(this.category).subscribe(
      (data: any) => {
        console.log(data);
        swal.fire('Success !!', 'Category is updated successfully.', 'success');
        this._router.navigate(['/admin/categories']);
      },
      (error) => {
        console.log(error);
        swal.fire('Error !!', 'Server error.', 'error');
      }
    )
  }

}
