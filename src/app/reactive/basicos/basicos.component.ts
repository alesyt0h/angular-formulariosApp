import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  // Sirve para un formulario con pocos campos, con demasiados seria inmatenible y dificil de leer
  //
  // miFormulario: FormGroup = new FormGroup({
  //   nombre     : new FormControl('RTX 4080ti'),
  //   precio     : new FormControl(1500),
  //   existencias: new FormControl(5),
  // })

  miFormulario: FormGroup = this._formBuilder.group({
    nombre: [ , [Validators.required, Validators.minLength(3)] ],
    precio: [ , [Validators.required, Validators.min(0)] ],
    existencias: [ , [Validators.required, Validators.min(0)] ],
  })

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(){
    // Se puede mandar como null si no fuera un campo necesario a estar en la base de datos o algo parecido
    //
    this.miFormulario.setValue({
      nombre: 'pepe',
      precio: 1600,
      existencias: null
    })
    // No dispararia el error si uno de los campos no es proveido
    //
    // this.miFormulario.reset({
    //   nombre: 'pepe',
    //   precio: 1600,
    // })
  }

  campoEsValido(field: string) {
    return this.miFormulario.controls[field].errors && this.miFormulario.controls[field].touched;
  }

  guardar(){
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    console.log(this.miFormulario.value)
    this.miFormulario.reset();
  }

}
