import { Injectable } from '@angular/core';
// import { Vehiculo } from '../utilitarios/Modelos/Vehiculo';
import { Observable, from, map } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://www.epico.gob.ec/vehiculo/public/api/';
  httpOptions = {
    //que tipo de dato le estamos pasando
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  //Realiza una solicitud GET para obtener todos los vehículos. Retorna un Observable de tipo Vehiculo[].
  getVehiculos(filtro?: string, rows?: number, page?: number, filtroCodigo?:string): Observable<Respuesta> {
    let body = new HttpParams();
    body = filtro ? body.set('filtro', filtro) : body;
    body = rows ? body.set('rows', rows) : body;
    body = page ? body.set('page', page) : body;
    body = filtroCodigo ? body.set('filtroCodigo', filtroCodigo) : body;
    console.log('Realizando solicitud GET para obtener todos los vehículos con los parámetros:', body.toString());
    return this.http.get<Respuesta>(this.baseUrl + 'vehiculos/', { params: body });
  }


  //si uso el diseno para recibir Json entonces ya no uso httpParams
  //Realiza una solicitud POST para insertar un nuevo vehículo en la API. Recibe un objeto Vehiculo como parámetro y retorna un Observable.
  insertVehiculo(vehiculo: Vehiculo) {
    console.log('Realizando solicitud POST para insertar un nuevo vehículo:', vehiculo);
    return this.http.post<Respuesta>(this.baseUrl + 'vehiculo/', vehiculo, this.httpOptions);
  }

  //Realiza una solicitud GET para obtener un vehículo específico por su código.
  getVehiculo(codigo: string) {
    console.log('Realizando solicitud GET para obtener un vehículo específico con código:', codigo);

    return this.http.get<Respuesta>(this.baseUrl + 'vehiculo/' + codigo);
  }

  //Editar vehiculo. Realiza una solicitud PUT para actualizar la información de un vehículo existente.
  updateVehiculo(vehiculo: any, codigo: string) {
    console.log('Realizando solicitud PUT para actualizar un vehículo con id:', codigo);
    return this.http.put<Respuesta>(this.baseUrl + 'vehiculo/' + vehiculo, codigo);
  }
 
  
  guardarNuevoVehiculo(vehiculo: any) {
    console.log('Realizando solicitud POST para guardar un nuevo vehículo:', vehiculo);
    return this.http.post<Respuesta>(this.baseUrl + 'vehiculo/', vehiculo, this.httpOptions);
  }
  
  //Para eliminar vehiculos (si funciona). Realiza una solicitud DELETE para eliminar un vehículo por su código.
  eliminarVehiculo(codigo: string) {

    return this.http.delete<Respuesta>(this.baseUrl + 'vehiculo/' + codigo);
  }


}

export interface Vehiculo {
  codigo: string;
  marca: string;
  modelo: string;
  kilometraje?: string;
  precio?: number;
  foto?: string | null;
  anio?: number;
  calificacion?: number;

}
export interface Respuesta {
  codigo: string;
  mensaje: string;
  data: Array<Vehiculo> | Vehiculo | any;
  rows: number;
  pages: number;
  records: number;
  page: number;
}