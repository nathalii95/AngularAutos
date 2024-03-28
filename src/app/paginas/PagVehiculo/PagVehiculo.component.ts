import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehiculoService, Vehiculo } from '../../servicios/Vehiculo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validadorCodigo } from '../../validaciones/VehiculoValidaciones'
import { Router } from '@angular/router';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-PagVehiculo',
  templateUrl: './PagVehiculo.component.html',
  styleUrls: ['./PagVehiculo.component.css']
})
export class PagVehiculoComponent implements OnInit {
  
  vehiculo?: Vehiculo;
  formulario: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private vehiculoService: VehiculoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.formulario = this.formBuilder.group({
      'codigo': ['', [Validators.required, validadorCodigo()]],
      'marca': ['', [Validators.required]],
      'modelo': [''],
      'anio': [''],
      'kilometraje': [''],
      'precio': [''],
      'calificacion': ['']
    });
    this.formulario.controls['codigo'].disable();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.vehiculoService.getVehiculo(params['codigo']).subscribe(data => {
        this.vehiculo = data.data;

        this.formulario.controls['codigo'].setValue(this.vehiculo?.codigo);
        this.formulario.controls['marca'].setValue(this.vehiculo?.marca);
        this.formulario.controls['modelo'].setValue(this.vehiculo?.modelo);
        this.formulario.controls['anio'].setValue(this.vehiculo?.anio);
        this.formulario.controls['kilometraje'].setValue(this.vehiculo?.kilometraje);
        this.formulario.controls['precio'].setValue(this.vehiculo?.precio);
        this.formulario.controls['calificacion'].setValue(this.vehiculo?.calificacion);
      }, error => {
        Swal.fire({
          title: "Mensaje",
          text: "No se pudo cargar la información",
          icon: "error"
        });
      });
    });
  }

  guardar() {
    if (this.formulario.valid) {
      this.vehiculoService.insertVehiculo({ ...this.formulario.value }).subscribe(data => {
        if (data.codigo === '1') {
          Swal.fire({
            title: "Mensaje",
            text: "Registro de Vehiculo guardado con éxito",
            icon: "success"
          });
          this.redirigir();
        }
      });
    } else {
      Swal.fire({
        title: "Mensaje",
        text: "Faltan campos por ingresar",
        icon: "error"
      });
    }
  }

  imprimir(data: any) {
    console.log('Calificación:', data);
  }

  redirigir() {
    console.log('Nos Redirige a lista de Vehiculos');
    this.router.navigateByUrl('/vehiculos');
  }

  
convertirAestrellas(cantidad: any): string {
  return '★'.repeat(cantidad);
}
}
