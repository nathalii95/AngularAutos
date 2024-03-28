import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-calificacion',
  templateUrl: './calificacion.component.html',
  styleUrls: ['./calificacion.component.css']
})
export class CalificacionComponent implements OnInit, OnChanges {
  @Input() calificacion: any = 0;
  @Output() accionClick = new EventEmitter<any>();
  lista: Array<any> = [];
  constructor() { }

  ngOnInit() {
    this.generar();
    }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['calificacion'].currentValue){
        this.generar();
      }
  }
    generar(){
      /* this.lista = []; */
      for (let i = 0; i < this.calificacion; i++) {
        this.lista.push(1);
    }
  }
select(){
  this.accionClick.emit(this.calificacion);
}
}
