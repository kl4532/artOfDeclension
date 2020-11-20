import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Case} from './models/Case';
import {Question} from './models/Question';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  data: any = null;
  questions: Question[] = [];
  answers: string[];
  drawedAnswers: string[] = [];
  timesUp: boolean = false;
  currentQuestion: Question;
  result: string = '';
  started = false;
  cases: Case[] = [
    {
      name: "Nominativ",
      selected: true
    },
    {
      name: "Genitiv",
      selected: true
    },
    {
      name: "Dativ",
      selected: true
    },
    {
      name: "Akkusativ",
      selected: true
    },
  ];
  numOfSelectedCases: number;
  score = {
    right: 0,
    wrong: 0
  };

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get('../assets/articleDeclension.json').subscribe(data => {
      this.data = data;
    });
  }

  isStarted() {
    this.initQuestions();
    this.started = true;
    this.timesUp = false;
    this.result = '';
  }

  initQuestions() {
    this.numOfSelectedCases = 0;
    this.cases.forEach(c=> c.selected ? this.numOfSelectedCases++ : null);
    if (this.numOfSelectedCases < 2) {
      return;
    }

    this.filterQuestions();

    this.drawQuestion();

    this.drawAnswers();
  }

  filterQuestions() {
    this.questions = [];
    this.answers = [];
    for (let c of this.cases) {
      if (c.selected) {
        const cName = c.name.toLocaleLowerCase();
        this.questions.push(this.data.questions[cName]);
        this.answers.push(this.data.articles[cName]);
      }
    }
    this.questions = this.questions.flat();
    this.answers = this.answers.flat();
  }

  drawAnswers() {
    this.drawedAnswers = [];
    const correctAnswer = this.currentQuestion.answer;
    const numOfPossibleAnswers = this.numOfSelectedCases < 3 ? 3 : 4;

    while (this.drawedAnswers.length < numOfPossibleAnswers - 1){
      const drawed = this.answers[this.getRandomInt(0, this.answers.length - 1)];
      if (this.drawedAnswers.indexOf(drawed) === -1 && drawed !== this.currentQuestion.answer) {
        this.drawedAnswers.push(drawed);
      }
    }
    // add correct answer to answers randomly
    this.drawedAnswers.splice(this.getRandomInt(0, 2), 0, correctAnswer);
    this.drawedAnswers.join();
  }

  drawQuestion() {
    const index = this.getRandomInt(0, this.questions.length - 1);
    this.currentQuestion = this.questions[index];
  }

  checkAnswer(a) {
    if(this.currentQuestion.answer === a) {
      this.result = 'Richtig!';
      this.score.right++;
    } else {
      this.result = 'Falsh...';
      this.score.wrong++;
    }
    this.initQuestions();
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }


}
