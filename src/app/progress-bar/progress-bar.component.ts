import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit{

  constructor(private elem: ElementRef) { }
  inner: HTMLElement;
  interval: any;
  time: number;
  @Input() initTime: number;
  @Output() finished = new EventEmitter<boolean>();

  @Input()
  public set start(val: boolean) {
    if (val) {
      console.log('progressStarted', val);
      this.startProgress();
    }
  }

  ngOnInit(): void {
  }

  process() {
    if( this.time <= 0){
      this.inner.style.width = '0%';
      clearInterval(this.interval);
      this.finished.emit(true);
      return;
    }

    this.time  = this.time - 0.01;
    const procent = this.time * 100 /this.initTime;
    this.setProgress(procent);
  }

  startProgress() {
    this.inner = this.elem.nativeElement.querySelector('.inner');
    this.time = this.initTime;
    this.setProgress(100);
    this.interval = setInterval( () => this.process(),10);
  }

  setProgress(proc: number) {
    this.inner.style.width = proc + "%";
  }

}
