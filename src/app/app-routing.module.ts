import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { Details1Component } from './details1/details1.component';
import { Details2Component } from './details2/details2.component';
import { Details3Component } from './details3/details3.component';
import { Details4Component } from './details4/details4.component';
import { Details5Component } from './details5/details5.component';
import { Details6Component } from './details6/details6.component';
import { Details7Component } from './details7/details7.component';
import { Details8Component } from './details8/details8.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,

  },
  {
    path:'details',
    component: DetailsComponent,
  },
  {
    path: '',
    redirectTo:'/details',
    pathMatch:'full',
  },
  {
    path:'details1',
    component: Details1Component,
  },
  {
    path: '',
    redirectTo:'/details1',
    pathMatch:'full',
  },
  {
    path:'details2',
    component: Details2Component,
  },
  {
    path: '',
    redirectTo:'/details2',
    pathMatch:'full',
  },
  {
    path:'details3',
    component: Details3Component,
  },
  {
    path: '',
    redirectTo:'/details3',
    pathMatch:'full',
  },
  {
    path:'details4',
    component: Details4Component,
  },
  {
    path: '',
    redirectTo:'/details4',
    pathMatch:'full',
  },
  {
    path:'details5',
    component: Details5Component,
  },
  {
    path: '',
    redirectTo:'/details5',
    pathMatch:'full',
  },
  {
    path:'details6',
    component: Details6Component,
  },
  {
    path: '',
    redirectTo:'/details6',
    pathMatch:'full',
  },
  {
    path:'details7',
    component: Details7Component,
  },
  {
    path: '',
    redirectTo:'/details7',
    pathMatch:'full',
  },
  {
    path:'details8',
    component: Details8Component,
  },
  {
    path: '',
    redirectTo:'/details8',
    pathMatch:'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
