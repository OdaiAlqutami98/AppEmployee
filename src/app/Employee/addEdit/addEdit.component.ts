import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/Interface/Employee';
import { EmployeeService } from 'src/app/Service/Employee.service';

@Component({
  selector: 'app-addEdit',
  templateUrl: './addEdit.component.html',
  styleUrls: ['./addEdit.component.css']
})
export class AddEditComponent implements OnInit {

  employeeForm!: FormGroup;
  isEditMode = false;
  employeeId!: string;
  employee!: Employee | null;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Initialize form with empty values
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', Validators.required],
      homeAddress: ['', Validators.required],
      ImagePath: ['']
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.employeeId = id;
        this.loadEmployee(id);
      } else {
        this.isEditMode = false;
      }
    });
  }

  loadEmployee(id: string): void {
    this.employeeService.getEmployeeById(id).subscribe(employee => {
      if (employee) {
        this.employee = employee;
        this.employeeForm.patchValue({
          name: employee.name,
          email: employee.email,
          mobileNumber: employee.mobileNumber,
          homeAddress: employee.homeAddress,
          ImagePath: employee.ImagePath
        });
      }
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const employeeData: Employee = this.employeeForm.value;

      if (this.isEditMode) {

        employeeData.employeeId = this.employeeId;
        this.employeeService.addEditEmployee(employeeData).subscribe(() => {
          this.router.navigate(['/employee']);
        });
      } else {

        this.employeeService.addEditEmployee(employeeData).subscribe(() => {
          this.router.navigate(['./list']);

        });
      }
    }
  }
}
