import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http: HttpClient) { }

  //load quiz
  public getQuizzes() {
    return this._http.get(`${baseUrl}/quiz/`);
  }

  //save quiz
  public addQuiz(quizData: any) {
    return this._http.post(`${baseUrl}/quiz/`, quizData);
  }

  //delete quiz
  public deleteQuiz(qId: number) {
    return this._http.delete(`${baseUrl}/quiz/${qId}`);
  }

  //get single quiz
  public getQuiz(qid: number) {
    return this._http.get(`${baseUrl}/quiz/${qid}`);
  }

  //update quiz
  public updateQuiz(quiz: any) {
    return this._http.put(`${baseUrl}/quiz/`, quiz);
  }
}
