import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  public nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';  //RegEx para validar nombre -espacio- apellido  ... No serviria para nombres con caracteres especiales o con apostrofes
  public emailPattern         : string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor() { }

  noPuedesSerStrider (control: FormControl): ValidationErrors | null {
    const valor = control.value?.trim().toLowerCase();
    console.log(valor);
    
    if (valor === 'strider'){
      return {
        noStrider: true
      }
    }
  
    return null;
  }

  // Password match

  camposIguales(campo1: string, campo2: string){

    return (formGroup: AbstractControl): ValidationErrors | null => {
      const pass1 = formGroup.get(campo1)?.value;
      const pass2 = formGroup.get(campo2)?.value;

      if (pass1 !== pass2) {
        formGroup.get(campo2)?.setErrors({noIguales: true})
        return {
          noIguales: true
        }
      }

      // Purga todos los errores de este campo asi que hay que tener cuidado, por que si hay mas errores personalizados en el campo, se borrarian todos y quedaria marcado como valid
      formGroup.get(campo2)?.setErrors(null)

      return null
    }

  }

}
