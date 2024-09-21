import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditComponent } from './Employee/addEdit/addEdit.component';
import { ListComponent } from './Employee/list/list.component';

const routes: Routes = [
  { path: '', redirectTo: 'addemployee', pathMatch: 'full' },
  {
    path:'list',
    component:ListComponent
  },
  {
    path:'employee',
    children:[
      {
        path:'',
        component:ListComponent
      },
      {
        path:'add',
        component:AddEditComponent
      },
    
    ]
  },
  { path: 'edit/:id', component: AddEditComponent },
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
