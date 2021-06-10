import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  public Editor = ClassicEditor;
  qId = 0;
  title = '';
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

  constructor(private _route: ActivatedRoute, private _questionService: QuestionService, private _snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params.qid;
    this.question.quiz['qid'] = this.qId;
    this.title = this._route.snapshot.params.title;
  }

  addQuestion() {
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
    // else if (this.question.option3.trim() == '' || this.question.option3 == null) {
    //   this._snackbar.open('Option3 is required !', 'Error', {
    //     duration: 3000
    //   });
    //   return;
    // }
    // else if (this.question.option4.trim() == '' || this.question.option4 == null) {
    //   this._snackbar.open('Option4 is required !', 'Error', {
    //     duration: 3000
    //   });
    //   return;
    // }
    else if (this.question.answer.trim() == '' || this.question.answer == null) {
      this._snackbar.open('Answer is required !', 'Error', {
        duration: 3000
      });
      return;
    }

    //saving data
    this._questionService.addQuestion(this.question).subscribe(
      (data: any) => {
        console.log(data);
        swal.fire('Success', 'Question added successfully.', 'success');
        this.question.content = '';
        this.question.option1 = '';
        this.question.option2 = '';
        this.question.option3 = '';
        this.question.option4 = '';
        this.question.answer = '';
      },
      (error) => {
        console.log(error);
        swal.fire('Error !', 'Failed to save question !', 'error');
      }
    );
  }

}
