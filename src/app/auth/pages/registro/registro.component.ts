import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ValidatorService } from '../../../shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})


export class RegistroComponent implements OnInit {
  
  miFormulario: FormGroup = this._fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this._vS.nombreApellidoPattern)] ],
    email: ['', [Validators.required, Validators.pattern(this._vS.emailPattern)], [this._eV]],
    username: ['', [Validators.required, this._vS.noPuedesSerStrider ] ],
    password: ['', [Validators.required, Validators.minLength(6)] ],
    password2: ['', [Validators.required] ],
  }, {
    validators: [ this._vS.camposIguales('password','password2')]
  })

  // emailErrorMsg: string = '';

  get emailErrorMsg(): string{
    const errors = this.miFormulario.get('email')?.errors;

    if (errors?.required) {
      return 'El email es obligatorio';
    } else if (errors?.pattern) {
      return 'El valor ingresado no tiene formato de correo';
    } else if (errors?.emailTomado) {
      return 'El email ya está en uso';
    }

    return '';
  }

  constructor( private _fb: FormBuilder,
               private _vS: ValidatorService,
               private _eV: EmailValidatorService ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Alejandro Ortigosa',
      email: 'test1@test.com',
      username: 'alesyt0h',
      password: '123456',
      password2: '123456'
    });
  }

 

  campoNoValido(campo: string){
    return this.miFormulario.get(campo)?.invalid
        && this.miFormulario.get(campo)?.touched;
  }

  submitFormulario(){
    console.log(this.miFormulario.value);

    this.miFormulario.markAllAsTouched();
  }

  //Not used - Dirty way

  // emailRequired(){
  //   return this.miFormulario.get('email')?.errors?.required
  //       && this.miFormulario.get('email')?.touched;
  // }

  // emailFormato(){
  //   return this.miFormulario.get('email')?.errors?.pattern
  //       && this.miFormulario.get('email')?.touched;
  // }

  // emailTomado(){
  //   return this.miFormulario.get('email')?.errors?.emailTomado
  //       && this.miFormulario.get('email')?.touched;
  // }
}
