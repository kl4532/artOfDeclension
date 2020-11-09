import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Case} from "./models/Case";

class Questions {
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  data: any = null;
  questions: Questions[] = [];
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
      name: "Dativ",
      selected: true
    },
  ]

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get('../assets/articleDeclension.json').subscribe(data => {
      this.data = data;
      console.log(this.data);
      this.filterQuestions();
    });
  }

  filterQuestions() {
    this.questions = [];
    for (let c of this.cases) {
      if(c.selected) {
        this.questions.push(this.data.questions[c.name.toLocaleLowerCase()]);
      }
    }
    this.questions = this.questions.flat();
    console.log(this.questions);
  }

}
