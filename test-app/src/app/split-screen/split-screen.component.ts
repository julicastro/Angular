import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'split-screen',
  templateUrl: './split-screen.component.html',
  styleUrls: ['./split-screen.component.scss']
})
export class SplitScreenComponent implements OnInit {
  
  private heroClassAnimate: string = 'animate';
  private header: HTMLElement | null = null;
  private heroContainer: HTMLElement | null = null;

  constructor() {
  }

  private setDOMSelectors(): void {
    this.header = document.querySelector('.js-header');
    this.heroContainer = document.querySelector('.js-hero');
  }

  private render(): void {
    if (this.heroContainer) {
      setTimeout(() => {
        if (this.heroContainer) {
          this.heroContainer.classList.add(this.heroClassAnimate);
        }
      }, 1);
    }
  }

  ngOnInit(): void {
    this.setDOMSelectors();
    this.render();
  }


}