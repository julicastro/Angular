import { Component } from '@angular/core';

@Component({
  selector: 'btn',
  templateUrl: './btn.component.html',
  styleUrls: ['./btn.component.scss']
})
export class BtnComponent {

  enabled;
  background;

  constructor(){
    this.enabled = true
    this.background = "Green"
  }

  public checkStatus() {
    if(this.enabled === false){
      this.background = "Grey";
    } else {
      this.background = "Green";
    }
  }

  public setEnabled(v: boolean) {
    this.enabled = v;
  }
  



}
