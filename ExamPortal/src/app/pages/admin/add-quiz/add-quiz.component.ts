import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories: any = {};

  quizData = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: false,
    category: {
      cid: ''
    }
  }

  constructor(private _categoryService: CategoryService, private _quizService: QuizService, private _snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this._categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
        swal("Error !!", "Error in loading categories !", "error");
      }
    );
  }

  formSubmit() {
    if (this.quizData.title.trim() == '' || this.quizData.title == null) {
      this._snackbar.open('Title is required !', 'ok', {
        duration: 3000
      })
      return;
    }
    if (this.quizData.description.trim() == '' || this.quizData.description == null) {
      this._snackbar.open('Description is required !', 'ok', {
        duration: 3000
      })
      return;
    }
    if (this.quizData.maxMarks == '' || this.quizData.maxMarks == null) {
      this._snackbar.open('MaxMarks is required !', 'ok', {
        duration: 3000
      })
      return;
    }
    if (this.quizData.numberOfQuestions == '' || this.quizData.numberOfQuestions == null) {
      this._snackbar.open('Number Of Questions is required !', 'ok', {
        duration: 3000
      })
      return;
    }
    if (this.quizData.category.cid == '' || this.quizData.category.cid == null) {
      this._snackbar.open('Category is required !', 'ok', {
        duration: 3000
      })
      return;
    }
    //save quiz data
    this._quizService.addQuiz(this.quizData).subscribe(
      (data: any) => {
        console.log(data);
        swal('Success.', 'Quiz added successfully.', 'success');
      },
      (error) => {
        console.log(error);
        swal('Error !!', 'Server error.', 'error');
      }
    );
  }

}
