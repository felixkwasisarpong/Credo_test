import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[formControlName][appPhoneMask]',
})
export class PhoneMaskDirective {

  constructor(public ngControl: NgControl) { }

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event: any) {
    this.onInputChange(event, false);
  }

  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event: { target: { value: any; }; }) {
    this.onInputChange(event.target.value, true);
  }
  

 
  onInputChange(event: string, backspace: boolean) {
    let newVal = event.replace(/\D/g, '');
    if (backspace && newVal.length <= 6) {
      newVal = newVal.substring(0, newVal.length - 1);
    }
    if (newVal.length === 0) {
      newVal = '';
    } else if (newVal.length <= 3) {
      newVal = newVal.replace(/^(\d{0,1})$/, '+$1');
    } else if (newVal.length <= 6) {
      newVal = newVal.replace(/^(\d{0,1})(\d{0,3})$/, '+$1 ($2)');
    } else if (newVal.length <= 7) {
      newVal = newVal.replace(/^(\d{0,1})(\d{0,3})(\d{0,3})$/, '+$1 ($2) $3');
    } else if (newVal.length <= 9) {
      newVal = newVal.replace(/^(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})$/, '+$1 ($2) $3-$4');
    } else {
      newVal = newVal.substring(0,11);
      newVal = newVal.replace(/^(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/, '+$1 ($2) $3-$4-$5');
    }
    this.ngControl.valueAccessor?.writeValue(newVal);
  }


}
