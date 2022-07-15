import { Component, OnInit } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

import { QuestionAnswers } from './exam.model';

@Component({
  selector: 'app-exam-dashboard',
  templateUrl: './exam-dashboard.component.html',
  styleUrls: ['./exam-dashboard.component.css'],
})
export class ExamDashboardComponent implements OnInit {
  quiz: QuestionAnswers[] = [];
  submitted: boolean = false;
  displayStyle = 'none';
  public index: number = 0;
  public ans: string = '';
  constructor(private dbService: NgxIndexedDBService) { }
  ngOnInit(): void {
    this.getAllData();
  }

  async getAllData() {
    this.dbService.getAll('adminTable').subscribe((res) => {
      res.forEach((questionDB) => {
        this.addQuestionToUI(questionDB).then((question) => {
          this.quiz.push(question);
        });
      });
      // this.quiz = res;
      // console.log(this.quiz);
    });
  }
  async addQuestionToUI(questionDb: any) {
    let question: QuestionAnswers = {
      id: questionDb.id,
      question: questionDb.question,
      options: [],
    };

    let answers = await this.getAnswersByQuestionId(questionDb.id);
    // question.options.push(...answers);
    // if (answers != null)
    //   answers.forEach((answer) => {
    //     question.options.push({
    //       answerId: answer.id,
    //       answerDescription: answer.answer,
    //       isCorrect: answer.isCorrect,
    //       questionId: answer.question_id,
    //     });
    //   });
    return question;
  }

  async getAnswersByQuestionId(id: number) {
    return await this.dbService
      .getByIndex('userResponse', 'question_id', id)

  }
  submitResponse(selectedItem: { id: any; }) {
    let answer = this.ans;
    let question_id = selectedItem.id;
    this.submitted = true;
    this.dbService
      .add('userResponse', {
        question_id,
        answer,
        user_id: 5,
      })
      .subscribe((key) => {
        // this.getAllData();
        this.displayStyle = 'none';
      });
  }
  changeQuestion(direction: string) {
    if (direction === 'next') {
      this.index = this.index + 1;
    } else {
      this.index = this.index - 1;
    }
    console.log('question', this.index);
  }
}
