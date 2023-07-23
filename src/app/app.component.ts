import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpApiService } from './core/http-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  userData: any;
  userList: any;
  userForm: FormGroup | any;

  constructor(private formBuilder: FormBuilder, private http: HttpApiService) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      website: [''],
      phone: [''],
      company: this.formBuilder.group({
        name: [''],
        catchPhrase: [''],
        bs: ['']
      }),
      address: this.formBuilder.group({
        street: [''],
        suite: [''],
        city: [''],
        zipcode: [''],
        geo: this.formBuilder.group({
          lat: [''],
          lng: ['']
        })
      })
    });
  }

  /**
   * clear data
   */
  clear() {
    this.userData = {};
    this.userList = [];
  }

  /**
   * Create user
   */
  onSubmit() {
    // Handle form submission here
    const url = 'users/create';
    const payload = this.userForm.value;
    this.userData = payload;
    this.http.post(url, payload).subscribe(response => {
      if (!response.success) {
        this.handleError(response);
      } else {
        alert(`Data Saved`);
      }
    })
    console.log(this.userForm.value);
  }

  /**
   * Get List of all users
   */
  getUserList() {
    const url = 'users';
    this.http.get(url).subscribe(response => {
      if (!response.success) {
        this.handleError(response);
      } else {
        this.userList = response.data;
      }
    })
    console.log(this.userForm.value);
  }


  isFieldInvalid(control:any) {
    const emailControl = this.userForm.get(control);
    return emailControl.invalid && emailControl.touched;
  }

  private handleError(response: any) {
    const error = response.error;
    alert(`${error.name}-${error.message}`);
  }
}
