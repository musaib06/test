import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { ExamDashboardComponent } from './exam-dashboard/exam-dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';


const dbConfig: DBConfig = {
  name: 'quizDB',
  version: 4,
  objectStoresMeta: [
    {
      store: 'adminTable',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'question', keypath: 'question', options: { unique: false} },
        { name: 'answer', keypath: 'answer', options: { unique: false}  },
        // {name: 'profile_photo', keypath: 'profile_photo', options: { unique: false}},
        // { name: 'option2', keypath: 'option2', options: { unique: false} },
        // { name: 'option3', keypath: 'option3', options: { unique: false} },
        // { name: 'option4', keypath: 'option4', options: { unique: false} },
      ],
    },
    {
      store: 'userResponse',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'user_id', keypath: 'user_id', options: { unique: false } },  
        { name: 'question_id', keypath: 'question_id', options: { unique: true} }, 
        { name: 'answer', keypath: 'answer', options: { unique: false } },       
        { name: 'isCorrect', keypath: 'isCorrect', options: { unique: false } },       
      ],
    },
  ],
};

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    ExamDashboardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatIconModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
