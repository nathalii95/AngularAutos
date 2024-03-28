import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import { validadorCodigo } from '../../validaciones/VehiculoValidaciones';
import { Router } from '@angular/router';

@Component({
  selector: 'app-PagVehiculoRegistro',
  templateUrl: './PagVehiculoRegistro.component.html',
  styleUrls: ['./PagVehiculoRegistro.component.css']
})
export class PagVehiculoRegistroComponent implements OnInit {
  formulario: FormGroup;

  constructor(

    private formBuilder: FormBuilder,
    private vehiculoServicio: VehiculoService,
    private router: Router
    
  ) {
    this.formulario = this.formBuilder.group({
      'codigo': ['', [Validators.required, validadorCodigo()]],
      'marca': ['',],
      'modelo': [''],
      'anio':[''],
      'kilometraje':[''],
      'precio': [],        
      'calificacion': ['']
    });
  }

  ngOnInit() {
  }

  guardar() {
    if (this.formulario.valid) {
      console.log('Guardando vehículo:', this.formulario.value);
      this.vehiculoServicio.insertVehiculo(this.formulario.value).subscribe(
        respuesta => {
          if (respuesta.codigo == '1') {
            Swal.fire({
              title: 'Mensaje Completo',
              text: 'Vehiculo registrado con exito',
              icon: 'success'
            }).then(() => {
              this.formulario.reset();
            });
          } else {
            Swal.fire({
              title: 'Mensaje',
              text: 'No se pudo registrar el vehiculo: ' + respuesta.mensaje,
              icon: 'error'
            });
          }
        },
      );
    } else {
      Swal.fire({
        title: 'Mensaje Incompleto',
        text: 'Existen campos sin llenar o con datos inválidos',
        icon: 'error'
      });
    }
  }

  irInicio() {
    this.router.navigateByUrl('/vehiculos');
  }
}