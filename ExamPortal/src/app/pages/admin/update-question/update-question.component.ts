import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  questionId = 0;
  question: any = {
    quiz: {},
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    image: ''
  };

  constructor(
    private _route: ActivatedRoute,
    private _questionService: QuestionService,
    private _snackbar: MatSnackBar,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.questionId = this._route.snapshot.params.questId;
    this._questionService.getQuestion(this.questionId).subscribe(
      (data) => {
        console.log(data);
        this.question = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateQuestion() {
    if (this.question.content.trim() == '' || this.question.content == null) {
      this._snackbar.open('Content is required !', 'Error', {
        duration: 3000
      });
      return;
    }
    else if (this.question.option1.trim() == '' || this.question.option1 == null) {
      this._snackbar.open('Option1 is required !', 'Error', {
        duration: 3000
      });
      return;
    }
    else if (this.question.option2.trim() == '' || this.question.option2 == null) {
      this._snackbar.open('Option2 is required !', 'Error', {
        duration: 3000
      });
      return;
    }
    else if (this.question.option3.trim() == '' || this.question.option3 == null) {
      this._snackbar.open('Option3 is required !', 'Error', {
        duration: 3000
      });
      return;
    }
    else if (this.question.option4.trim() == '' || this.question.option4 == null) {
      this._snackbar.open('Option4 is required !', 'Error', {
        duration: 3000
      });
      return;
    }
    else if (this.question.answer.trim() == '' || this.question.answer == null) {
      this._snackbar.open('Answer is required !', 'Error', {
        duration: 3000
      });
      return;
    }

    //saving data
    this._questionService.updateQuestion(this.question).subscribe(
      (data: any) => {
        console.log(data);
        swal.fire('Success', 'Question updated successfully.', 'success').then(e => {
          this._router.navigate(['/admin/view-questions/' + this.question.quiz.qid + '/' + this.question.quiz.title]);
        });
      },
      (error) => {
        console.log(error);
        swal.fire('Error !', 'Failed to update question !', 'error');
      }
    );
  }
}
