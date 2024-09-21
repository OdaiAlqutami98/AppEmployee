import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/app/Interface/Employee';
import { EmployeeService } from 'src/app/Service/Employee.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddEditComponent } from '../addEdit/addEdit.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'mobileNumber', 'homeAddress', 'actions'];
  dataSource: MatTableDataSource<Employee> = new MatTableDataSource<Employee>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private employeeService: EmployeeService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe((employees: Employee[]) => {
      this.dataSource.data = employees;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editEmployee(employee: Employee): void {
    this.router.navigate(['./edit', employee.employeeId]);
  }

  deleteEmployee(employee: Employee): void {
    this.employeeService.deleteEmployees(employee.employeeId).subscribe(() => {
      const index = this.dataSource.data.indexOf(employee);
      if (index >= 0) {
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
      }
      this.loadEmployees();
    }, (error) => {
      console.error('Error deleting employee:', error);
    });
  }
  addNew(): void {
    this.openModal();
  }
  openModal(employee?: Employee): void {
    const dialogRef = this.dialog.open(AddEditComponent, {
      width: '700px',
      height: 'auto',
      panelClass: 'custom-dialog',
      data: { employee: employee, action: employee ? 'edit' : 'add' },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadEmployees();
    });
  }
}
