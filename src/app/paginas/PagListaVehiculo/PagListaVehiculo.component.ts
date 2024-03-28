import { Component, OnInit } from '@angular/core';
import { VehiculoService, Respuesta, Vehiculo } from '../../servicios/Vehiculo.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-PagListaVehiculo',
  templateUrl: './PagListaVehiculo.component.html',
  styleUrls: ['./PagListaVehiculo.component.css']
})
export class PagListaVehiculoComponent implements OnInit {

  constructor(private vehiculoService: VehiculoService, private router: Router) { }
  public mostrarImagen = false;
  public listaVehiculos: Array<Vehiculo> = [];
  public filas: number = 10;
  public page: number = 1;
  public pages: number = 0;
  private _filtro: string = "";
 

 get filtro(){
   return this._filtro
 }

 set filtro(data:string){
   this._filtro = data;
   this.consultarVehiculos();
 }
  
  ngOnInit() {
    this.consultarVehiculos();
  }

  consultarVehiculos() {
    this.vehiculoService.getVehiculos(this.filtro, this.filas, this.page).subscribe(respuesta => { 
          this.listaVehiculos = respuesta.data;
          this.pages = respuesta.pages;
          this.paginacion(this.pages);
          console.log('Listado de vehículos actualizada:', this.listaVehiculos);
      }, error => {
        console.log(error);  
      }
    );
}

convertirAestrellas(cantidad: any): string {
  return '★'.repeat(cantidad);
}

  nextpage(pagina: number) {
    this.page = pagina;
    this.consultarVehiculos();
  }

  listaPaginas: Array<number> = [];

  paginacion(pages: number) {
    this.listaPaginas = [];
    for (let i = 1; i <= this.pages; i++) {
      this.listaPaginas.push(i);
    }
  }

  next() {
    if (this.page < this.page) {
      this.page++;
      this.consultarVehiculos();
    }
  }

  back() {
    if (this.page > 1) {
      this.page--;
      this.consultarVehiculos();
    }
  }

  editarVehiculo(codigo: string) {
    Swal.fire({
      title: "¿Estás seguro de que quieres editar este registro??",
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      icon: 'question'
    }).then((res) => {
      if (res.isConfirmed) {
        this.router.navigateByUrl(`/editar/${codigo}`);
      }
    });
  }

  eliminar(codigo: string) {
    Swal.fire({
      title: "¿Estás seguro de que deseas eliminar este registro?",
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      icon: 'question'
    }).then((res) => {
      if (res.isConfirmed) {
        this.vehiculoService.eliminarVehiculo(codigo).subscribe(data => {
          if (data.codigo == '1') {
            Swal.fire({
              title: "Mensaje",
              text: 'El registro se ha eliminado correctamente."',
              icon: 'success'
            });
          } else {
            Swal.fire({
              title: "Mensaje",
              text: 'Se ha producido un error al intentar eliminar el registro siguiente: ' + data.mensaje,
              icon: 'error'
            });
          }
        });
      }
    });
  }



}
