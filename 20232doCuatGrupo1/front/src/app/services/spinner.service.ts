import { Injectable } from '@angular/core';

@Injectable()
export class SpinnerService {
  showSpinner: boolean = false;

  show() {
    this.showSpinner = true;
  }

  hide() {
    this.showSpinner = false;
  }
}
