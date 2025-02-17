import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'text-input',
  standalone: false,
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
})
export class TextInputComponent implements OnInit {
@Input()
control!:AbstractControl;

get formControl(){
  return this.control as FormControl;
}
  constructor() { }

  ngOnInit(): void {
  }


}