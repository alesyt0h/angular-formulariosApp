import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent implements OnInit {

  constructor( private _formBuilder: FormBuilder ) { }

  miFormulario: FormGroup = this._formBuilder.group({
    nombre: [ '', [Validators.required, Validators.minLength(3)] ],
    favoritos: this._formBuilder.array( [
      [ 'Metal Gear', Validators.required ],
      [ 'Death Standing', Validators.required ],
      // Se puede resumir tal y como esta arriba
      // this._formBuilder.control('','')
    ] ,Validators.required)
  });

  nuevoFavorito: FormControl = this._formBuilder.control('',Validators.required)

  get favoritosArr() {
    return this.miFormulario.get('favoritos') as FormArray;
  }

  ngOnInit(): void {
  }

  campoEsValido(field: string) {
    return this.miFormulario.controls[field].errors && this.miFormulario.controls[field].touched;
  };

  agregarFavorito(){
    if (this.nuevoFavorito.invalid) { return }

    this.favoritosArr.push(this._formBuilder.control( this.nuevoFavorito.value,Validators.required));
    // this.favoritosArr.push(new FormControl(this.nuevoFavorito.value,Validators.required))

    this.nuevoFavorito.reset();
  }

  guardar(){
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    console.log(this.miFormulario.value)
  };

  borrar(index: number){
    this.favoritosArr.removeAt(index)
  }

}
