import { HttpClient, HttpHeaders, } from '@angular/common/http'; import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  baseUrl = 'http://www.epico.gob.ec/vehiculo/public/api';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  addUser(cliente: cliente) {
    console.log('Realizando solicitud POST para agregar un nuevo usuario:', cliente);

    return this.http.post<UserData>(this.baseUrl + 'cliente/', cliente, this.httpOptions);
  }

}

export interface cliente {
  id: string;
  nombre?: string;
  apellido?: string;
  password?: string;
  telefono?: string|null;
  email?: string|null;
}


export interface UserData {
  nombre: string;
  apellido: string;
  password: string;
  email: string;
  telefono: string;
}
