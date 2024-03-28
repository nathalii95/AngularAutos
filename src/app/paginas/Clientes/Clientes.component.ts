import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../servicios/Cliente.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-Clientes',
  templateUrl: './Clientes.component.html',
  styleUrls: ['./Clientes.component.css']
})
export class ClientesComponent implements OnInit {
  mostrarTarjeta: boolean = false;
  id: string='';
  nombre: string = '';
  apellido:string='';
  password: string = '';
  email: string = '';
  telefono: string = '';

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  toggleTarjeta(event: any) {
    this.mostrarTarjeta = event.target.checked;
  }

  redirectToHome() {
    this.router.navigateByUrl('/home');
  }

  
/*
  registrarCliente() {
     const user = {
      id:this.id,
      nombre: this.nombre,
      apellido:this.apellido,
      password: this.password,
      email: this.email,
      telefono: this.telefono
    }; */
  
/*     console.log('Datos del usuario a enviar:', user);
    this.userService.addUser(user).subscribe(
      response => {
        console.log('Cliente registrado exitosamente:', response);
        this.router.navigateByUrl('/home');
      },
      error => {
        console.error('Error al registrar cliente:', error);
      }
    ); */

   /*  Swal.fire({
      title: "¿Estás seguro de que quieres guardar este registro??",
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      icon: 'question'
    }).then((result) => {
      if (result.value) {
        this.userService.addUser(user).subscribe(
          response => {
            console.log('Cliente registrado exitosamente:', response);
            this.router.navigateByUrl('/home');
          }, error => {
          console.error('Error al registrar cliente:', error);
        })
      }
    });
 

  }*/




  
  
  
    commonValidate() {

      const user = {
        id:this.id,
        nombre: this.nombre,
        apellido:this.apellido,
        password: this.password,
        email: this.email,
        telefono: this.telefono
      };

      if (this.nombre == "") {
        alert("Ingrese un nombre de Cliente");
      } else if (this.apellido == "" ) {
        alert("Ingrese el apellido del cliente");
      } else if (this.password == "") {
        alert("Ingrese una contraseña");
      }  else if (this.mostrarTarjeta == true && this.email == "" && this.telefono == "") {
        alert("Si a seleccionado que desea contactarse , escriba el correo y teléfono");
      } else{
      Swal.fire({
        title: 'Mensaje Completo',
        text: 'Registro Guardado con Éxito',
        icon: 'success'
      }).then((result) => {
        console.log(user);
      });
       
    }
  }

     

  
}
