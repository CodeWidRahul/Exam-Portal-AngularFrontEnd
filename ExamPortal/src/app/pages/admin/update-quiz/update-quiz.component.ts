import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  qid = 0;
  quiz: any;
  categories: any;

  constructor(
    private _route: ActivatedRoute,
    private _quizService: QuizService,
    private _categoryService: CategoryService,
    private _snackbar: MatSnackBar,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.qid = this._route.snapshot.params.qid;
    console.log(this.qid);

    -this._quizService.getQuiz(this.qid).subscribe(
      (data) => {
        this.quiz = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );

    this._categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        swal.fire('Error !!', 'Error in loading categories', 'error');
      }
    );
  }

  updateData() {
    if (this.quiz.title.trim() == '' || this.quiz.title == null) {
      this._snackbar.open('Title is required !', 'ok', {
        duration: 3000
      })
      return;
    }
    if (this.quiz.description.trim() == '' || this.quiz.description == null) {
      this._snackbar.open('Description is required !', 'ok', {
        duration: 3000
      })
      return;
    }
    if (this.quiz.maxMarks == '' || this.quiz.maxMarks == null) {
      this._snackbar.open('MaxMarks is required !', 'ok', {
        duration: 3000
      })
      return;
    }
    if (this.quiz.numberOfQuestions == '' || this.quiz.numberOfQuestions == null) {
      this._snackbar.open('Number Of Questions is required !', 'ok', {
        duration: 3000
      })
      return;
    }
    if (this.quiz.category.cid == '' || this.quiz.category.cid == null) {
      this._snackbar.open('Category is required !', 'ok', {
        duration: 3000
      })
      return;
    }
    //update quiz data
    this._quizService.updateQuiz(this.quiz).subscribe(
      (data) => {
        swal.fire('Success', 'Quiz updated successfully.', 'success').then(e => {
          this._router.navigate(['/admin/quizzes']);
        });
      },
      (error) => {
        swal.fire('Error !!', 'Error in updating quiz data!', 'error');
        console.log(error);
      }
    );
  }

}
