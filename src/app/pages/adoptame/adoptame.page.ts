import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DataService } from '../../service/data.service';
import { NavigationExtras, Router} from '@angular/router';
import { AuthService } from '../../service/auth.service';



@Component({
  selector: 'app-adoptame',
  templateUrl: './adoptame.page.html',
  styleUrls: ['./adoptame.page.scss'],
})
export class AdoptamePage {

  
  @Input() isSolicitar:boolean;
  users = [];
  contacto: any = {
    telefono:''};

  constructor(private dataService : DataService ,
               private router: Router,
               private authService: AuthService,
               private alertController:AlertController
               ) 
               
  {
    this.dataService.getUser().subscribe(res =>{
      console.log(res);
      this.users = res;
    })
  
    
    
  
  }

  
  openNote(note){
  }

  volver(){
    let navigationExtras: NavigationExtras={
    
    }
    this.router.navigate(['../home'], navigationExtras);
  }

  async logout(){
    await this.authService.logut();
    this.router.navigateByUrl('/', {replaceUrl:true});}

async addUser(){
  const alert = await this.alertController.create({
    header :'Formulario de Adopción',
    inputs: [
      {
        name : 'nameC',
        placeholder: 'Nombre Completo',
        type:'text'
      },
      {
        name : 'rut',
        placeholder: 'Rut',
        type:'text'
      },
      {
        name : 'direccion',
        placeholder: 'Dirección',
        type:'text'
      },
      {
        name : 'tipocasa',
        placeholder: '¿Casa propia o arrendada?',
        type:'text'
      },
      {
        name : 'permiso',
        placeholder: 'En caso de arriendo, ¿Tiene permiso SÍ/NO? ',
        type:'text'
      },
  
      {
        name : 'telefono',
        placeholder: 'Número de Contacto',
        type:'text'
      },
      {
        name : 'email',
        placeholder: 'Email con el que se registró',
        type:'text'
      },
      {
        name : 'mascota',
        placeholder: 'Ingrese mascota que desea adoptar',
        type:'text'
      }
    ],
    buttons:[
      {
        text : 'Cancelar',
        role : 'cancel'
      },
      {
        text: 'Agregar',
        handler: (res) => {
          this.dataService.addUser({nameC: res.nameC , rut : res.rut ,  direccion:res.direccion,tipocasa: res.tipocasa,permiso: res.permiso, telefono:res.telefono,email:res.email, mascota : res.mascota })
            this.enviarCorreo();
            this.confirmar();
        }
      }
    ]
  });
  await alert.present();
 
}

async confirmar(){
  localStorage.setItem('telefono',this.contacto.telefono);
    const alert = await this.alertController.create({
    message: 'Se ha enviado tu solicitud!',
    buttons: [{
      text: 'Aceptar'       
    }]
  });
  await alert.present();
}

option ={
  slidesPerView: 1.5,
  centeredSlides: true,
  loop: true,
  spaceBetween: 10,
  autoplay: true, 

}

cancelar(){
  this.isSolicitar=false;
}

enviarCorreo(){
  
  var feedback = document.createElement('a');
  feedback.setAttribute('href',
//cambiar mail de prueba!!!!!!!! 
  'mailto:Findpets.fundacion@gmail.com?subject=Solcitud%20%20adopción&cc=g.hidalgo@duocuc.cl&body=Solcitud%de%20adopción.'
  +'%20Contacto:%20'
  //+ localStorage.getItem(this.contacto.telefono)

  );
  feedback.click();
  console.log('mail enviado');
} 






}