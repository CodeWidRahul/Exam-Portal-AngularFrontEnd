import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import swal from 'sweetalert';

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
        swal('Error !!', 'Error in loading categories.', 'error');
      }
    )
  }

}
