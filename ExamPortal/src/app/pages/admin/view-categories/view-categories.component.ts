import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories: any = {
    cid: '',
    title: '',
    description: ''
  };

  constructor(private _category: CategoryService) { }

  ngOnInit(): void {
    this._category.getCategories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
        swal.fire('Error !!', 'Error in loading categories.', 'error');
      }
    )
  }

  deleteCategory(cid: number) {
    swal.fire({
      icon: 'warning',
      title: 'Are you sure ?',
      text: 'Once deleted, you will not be able to recover this data!',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    })
      .then((willDelete) => {
        if (willDelete.isConfirmed) {
          this._category.deleteCategory(cid).subscribe(
            (data) => {
              console.log(data);
              this.categories = this.categories.filter((category: any) => category.cid != cid);
              swal.fire('Sucess', 'Category deleted.', 'success');
            },
            (error) => {
              console.log(error);
              swal.fire('Error', 'Server problem !', 'error')
            }
          )
        } else {
          swal.fire("Category data is safe!");
        }
      });
  }

}
