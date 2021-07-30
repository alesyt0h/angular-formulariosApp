import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent implements OnInit {

  miFormulario: FormGroup = this._formBuilder.group({
    genero: [ 'M', Validators.required ],
    notificaciones: [ true, Validators.required ],
    condiciones: [false, Validators.requiredTrue ]
  })

  persona = {
    genero: 'F',
    notificaciones: true
  }

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.miFormulario.reset( {...this.persona, condiciones: true} )


    // Suscribirse a un campo especifico para ver como cambia el valor del objeto persona en tiempo real --- NO SOLO del formulario, como hemos venido haciendo
    //
    // this.miFormulario.get('condiciones')?.valueChanges.subscribe( newValue => {
    //   console.log(newValue);
    // });

    // this.miFormulario.valueChanges.subscribe( form => {
    //   delete form.condiciones;

    //   this.persona = form
    // })
    

    //
    // Extra las condiciones y el restoDeArgumentos es lo que va a pasar a this.persona
    //
    this.miFormulario.valueChanges.subscribe( ({condiciones, ...restoDeArgumentos}) => {
      // delete form.condiciones;

      this.persona = restoDeArgumentos
    })
  }

  guardar(){
    const formValue = {...this.miFormulario.value};

    delete formValue.condiciones;

    this.persona = formValue
  }
}
