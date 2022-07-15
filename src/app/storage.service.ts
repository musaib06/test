import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private dbService: NgxIndexedDBService) { }


  addAnswerToDb(questionId: number, answers: any, isCorrect = false) {
    return this.dbService.add('userResponse', {
      question_id: questionId,
      answer: answers.answer,
      isCorrect: isCorrect
    });
  }



  addQuestionToDb(question: string) {
    return this.dbService.add('adminTable', {
      question: question,
    });
  }
}
