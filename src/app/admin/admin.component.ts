import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { StorageService } from '../storage.service';
import { editQuestions } from './admin.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  public isUpdate: boolean = false;
  public isMenuCollapsed = true;
  updateUser?: editQuestions;
  // user: Question;

  submitted: boolean = false;

  returnMsg!: string;
  up: boolean = false;
  showUpdate: boolean = false;

  public user: any = {
    id: 0,
    question: '',
    answer: '',
    option2: '',
    option3: '',
    option4: '',
    //  profile_photo:''
  };

  constructor(
    private dbService: NgxIndexedDBService,
    private storageService: StorageService
  ) {
    // this.getFromIndexDb(this.email)
    this.getAllData();
  }

  async submit(form: NgForm) {
    let questions = form.value;
    this.submitted = true;
    if (
      questions.question &&
      questions.answer &&
      questions.option2 &&
      questions.option3 &&
      questions.option4
    ) {
      this.storageService
        .addQuestionToDb(questions.question)
        .subscribe((key) => {
          console.log(key);
          this.addAnswers(questions, key.id);
        });
    }
    form.resetForm();
  }
  key(questions: any, key: any) {
    throw new Error('Method not implemented.');
  }
  async addAnswers(questions: any, qid: number) {
    await this.storageService
      .addAnswerToDb(qid, questions.answer, true)
      .subscribe((key) => {});
    await this.storageService
      .addAnswerToDb(qid, questions.option2)
      .subscribe((key) => {});
    await this.storageService
      .addAnswerToDb(qid, questions.option3)
      .subscribe((key) => {});
    await this.storageService
      .addAnswerToDb(qid, questions.option4)
      .subscribe((key) => {});
  }

  // fileData: any;
  // fileEvent(e, form) {
  //   //get attached file
  //   this.fileData = e.target.files[0];
  //   let data = form.value;
  //   data.photo = this.fileData;
  // }

  tableData: any;
  getAllData() {
    this.dbService.getAll('adminTable').subscribe((res) => {
      this.tableData = res;
    });
  }
  search: any;
  data: any;
  //function to retrive all by index
  // getFromIndexDb(question) {
  //   this.dbService
  //     .getAllByIndex('adminTable', 'question', IDBKeyRange.only(question))
  //     .subscribe((res) => {
  //       this.data = res;
  //       console.log(res);
  //     });
  // }

  // editTable?: editQuestions;
  editdata(id: number) {
    this.dbService.getByID('adminTable', id).subscribe((res: any) => {
      var editTable = res;
      this.updateUser = editTable;
      if (this.updateUser != null) {
        this.updateUser.id = id;
      }
      this.showUpdate = true;
    });
    this.isUpdate = true;
  }
  deleteData(id: number) {
    this.dbService.delete('adminTable', id).subscribe((res) => {
      this.getAllData();
    });
  }
  displayStyle = 'none';

  openSubPopup() {
    console.log('working');
    this.displayStyle = 'block';
  }

  closeSubPopup() {
    this.displayStyle = 'none';
  }

  submitTable: any;
  openPopup() {
    this.user = {};
    console.log('working');
    this.displayStyle = 'block';
  }

  closeUpdate() {
    this.isUpdate = false;
  }

  updateData(formm: any) {
    const dataa = formm.value;
    console.log(dataa);

    //add dataa to indexedDB
    if (this.updateUser != null) {
      this.dbService
        .update('adminTable', {
          id: this.updateUser.id,
          question: dataa.question,
          answer: dataa.answer,
          // profile_photo: '',
          option2: dataa.option2,
          option3: dataa.option3,
          option4: dataa.option4,
        })
        .subscribe((key) => {
          alert('updated successfully');
          // console.log('key: ', key);
          this.getAllData();
          this.isUpdate = false;
          this.displayStyle = 'none';
        });
    }
    console.log('your data is invalid ');
  }
  ngOnInit(): void {
    // this.addDummyData();
  }

  // addDummyData(){
  //   this.dbService
  //   .add('adminTable', {
  //     question: "This Is test question",
  //     answer: 'answer',
  //     option2: 'Option2',
  //     option3: 'option3',
  //     option4: 'option 4',
  //   })
  //   .subscribe((key) => {
  //     console.log('key: ', key);
  //   });
  //   this.dbService
  //   .add('newTable', {
  //     question: "This Is test question in newTable",
  //   })
  //   .subscribe((key) => {
  //     console.log('key: ', key);
  //   });
  // }
}
