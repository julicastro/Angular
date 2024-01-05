import { Component, OnInit } from '@angular/core';
import * as anime from 'animejs/lib/anime.es.js';

@Component({
  selector: 'app-my-component',
  template: '<div class="box"></div>',
  styleUrls: ['./my-component.component.css']
})
export class MyComponent implements OnInit {
  ngOnInit(): void {
    const box = document.querySelector('.box');

    anime({
      targets: box,
      translateX: 250,
      backgroundColor: '#3498db',
      duration: 1000,
      easing: 'easeOutExpo'
    });
  }
}
Este código utilizará las funciones de anime.js para crear una animación en el elemento con la clase .box. Asegúrate de que tus estilos CSS estén configurados adecuadamente para que la animación funcione según lo esperado.






