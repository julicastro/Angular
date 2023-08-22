import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.scss']
})
export class TestComponentComponent implements OnInit{

  edad: number;
  nombres:Array<string>;


  constructor(){
    this.edad = 17
    this.nombres = ['Juli','Emanuel','Castro','Messi']
  }

  ngOnInit(): void {
      console.log('componente cargardo');
  }

  aumentar(): void{
    this.edad++;
  }

  disminuir(): void{
    this.edad--;
  }


}
