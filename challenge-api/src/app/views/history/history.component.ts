import { Component, OnInit } from '@angular/core';
import { HistoryService } from 'src/app/services/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.sass']
})
export class HistoryComponent implements OnInit {

  history: any[] = [];

  constructor(private historyService: HistoryService) {}

  ngOnInit(): void {
    this.history = this.historyService.obtenerHistorial();
  }
}