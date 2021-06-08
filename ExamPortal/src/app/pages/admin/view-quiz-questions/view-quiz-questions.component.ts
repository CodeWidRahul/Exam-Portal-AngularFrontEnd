import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qid: any;
  title: any;
  questions: any = [];

  constructor(private _route: ActivatedRoute, private _questionService: QuestionService) { }

  ngOnInit(): void {
    this.qid = this._route.snapshot.params.qid;
    this.title = this._route.snapshot.params.title;
    this._questionService.getQuestionsOfQuiz(this.qid).subscribe(
      (data: any) => {
        console.log(data);
        this.questions = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteQuestion(questionId: number) {
    //console.log(questionId);
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
          this._questionService.deleteQuestion(questionId).subscribe(
            (data) => {
              console.log(data);
              this.questions = this.questions.filter((question: any) => question.questId != questionId);
              swal.fire('Sucess', 'Question deleted.', 'success');
            },
            (error) => {
              console.log(error);
              swal.fire('Error', 'Server problem !', 'error')
            }
          )
        } else {
          swal.fire("Question data is safe!");
        }
      });
  }
}
