import { NgModule } from "@angular/core";
import { AEspacioPipe } from "./pipes/AEspacio.pipe";
import { CalificacionComponent } from "./componentes/calificacion/calificacion.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations:[
        
        CalificacionComponent,
    ],
    imports:[
        CommonModule,
        
    ],

    exports:[
        
        CalificacionComponent,
        
    ]
})

export class UtilitariosModule{
    
}