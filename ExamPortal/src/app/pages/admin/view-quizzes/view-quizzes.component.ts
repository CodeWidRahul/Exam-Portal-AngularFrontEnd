import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes: any = [];

  constructor(private _quizService: QuizService) { }

  ngOnInit(): void {
    this._quizService.getQuizzes().subscribe(
      (data: any) => {
        this.quizzes = data;
        console.log(this.quizzes);
      },
      (error) => {
        console.log(error);
        swal('Error !!', 'Error in loading data.', 'error');
      }
    );
  }

  deleteQuiz(qId: number) {

    swal({
      icon: "warning",
      title: 'Are you sure ?',
      text: "Once deleted, you will not be able to recover this data!",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this._quizService.deleteQuiz(qId).subscribe(
            (data) => {
              console.log(data);
              this.quizzes = this.quizzes.filter((quiz: any) => quiz.qid != qId);
              swal('Sucess', 'Quiz deleted.', 'success');
            },
            (error) => {
              console.log(error);
              swal('Error', 'Server problem !', 'error')
            }
          )
        } else {
          swal("Quiz data is safe!");
        }
      });
  }

}
