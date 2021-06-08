import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import swal from 'sweetalert2';

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
        swal.fire('Error !!', 'Error in loading data.', 'error');
      }
    );
  }

  deleteQuiz(qId: number) {

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
          this._quizService.deleteQuiz(qId).subscribe(
            (data) => {
              console.log(data);
              this.quizzes = this.quizzes.filter((quiz: any) => quiz.qid != qId);
              swal.fire('Sucess', 'Quiz deleted.', 'success');
            },
            (error) => {
              console.log(error);
              swal.fire('Error', 'Server problem !', 'error')
            }
          )
        } else {
          swal.fire("Quiz data is safe!");
        }
      });
  }

}
