import { Component, OnInit } from '@angular/core';
import { SharedComponent } from './shared';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends SharedComponent implements OnInit {

  public myForm: FormGroup

  constructor(
    private fb: FormBuilder
  ) {
    super('log this');
    this.myForm = this.fb.group({
      username: [''],
      password: [''],
      role: [''],
      status: ['']
    })
  }
  title = 'webapp';

  statusReseted: boolean = false;

  reset() {
    this.myForm.reset();
    this.statusReseted = true;
    console.log(this.myForm)
  }

  ngOnInit() {
    this.myForm.valueChanges
    .subscribe(control => {
      console.log(control)
    })
  }
}
