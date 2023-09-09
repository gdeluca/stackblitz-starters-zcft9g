import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

import { CommonModule } from '@angular/common';
import { RoleListComponent } from './roles/role-list/role-list.component';
import { RoleDetailsComponent } from './roles/role-details/role-details.component';
import { RoleEditComponent } from './roles/role-edit/role-edit.component';
import { RoleDeleteComponent } from './roles/role-delete/role-delete.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Add your Angular Material imports here, e.g., MatIconModule, MatInputModule, MatFormFieldModule, MatCardModule, etc.
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

/*import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkTreeModule } from '@angular/cdk/tree';
import { PortalModule } from '@angular/cdk/portal';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';*/

import { AppComponent } from './app/app.component';
import { NavigationComponent } from './navigation/navigation.component';

const routes: Routes = [
  { path: 'roles', component: RoleListComponent },
  { path: 'roles/:id', component: RoleDetailsComponent },
  { path: 'roles/:id/edit', component: RoleEditComponent },
  { path: 'roles/:id/delete', component: RoleDeleteComponent },
  { path: '', redirectTo: '/roles', pathMatch: 'full' },

  // Other routes...
];

@NgModule({
  declarations: [
    AppComponent, // Add your components here
    NavigationComponent,
    RoleListComponent, 
    RoleDeleteComponent,
    RoleDetailsComponent,
    RoleEditComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes), // Configure the router with the defined routes
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    /* CdkTreeModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDividerModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatButtonToggleModule,
  MatTreeModule,
  OverlayModule,
  PortalModule*/
  

    // Add any other modules you need
  ],
  providers: [],
  bootstrap: [AppComponent], // Set your root component here
})
export class AppModule { }