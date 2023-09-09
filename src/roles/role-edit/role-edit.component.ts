import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../role.service';
import { Role } from '../role';
import { PermissionService } from '../permission.service';
import { Permission } from '../permission';
import { PermissionCheckboxes } from '../permission-checkboxes';


import { BehaviorSubject, forkJoin, Observable, Subject, throwError } from 'rxjs';
import { switchMap, tap, takeUntil, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.css'],
})
export class RoleEditComponent implements OnInit, OnDestroy {
  roleId!: number;
  roleForm!: FormGroup;
  roleSubject = new BehaviorSubject<Role>({ id: 0, name: '', permissions: [] });
  permissionsSubject = new BehaviorSubject<Permission[]>([]);
  private ngUnsubscribe = new Subject<void>(); // Used to unsubscribe from observables

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private permissionService: PermissionService
  ) {}

  ngOnInit() {
    this.roleId = +this.route.snapshot.paramMap.get('id')!;

    // Fetch role details and permissions using forkJoin and switchMap
    forkJoin([
      this.roleService.getRoleById(this.roleId).pipe(
        catchError((error) => {
          console.error('Error fetching role details:', error);
          return throwError('Failed to fetch role details');
        })
      ),
      this.permissionService.getPermissions().pipe(
        catchError((error) => {
          console.error('Error fetching permissions:', error);
          return throwError('Failed to fetch permissions');
        })
      ),
    ])
      .pipe(
        switchMap(([role, permissions]) => {
          this.roleSubject.next(role);
          this.permissionsSubject.next(permissions);

          // Populate the form with role details and selected permissions
          this.initializeForm(role);

          return this.roleForm.valueChanges; // Return an observable that emits form changes
        }),
        takeUntil(this.ngUnsubscribe), // Unsubscribe when the component is destroyed
        catchError((error) => {
          console.error('Error in component:', error);
          // Handle component-level error here, e.g., display an error message to the user
          return throwError('An error occurred in the component');
        })
      )
      .subscribe(() => {
        // Handle form value changes if needed
      });

    // Initialize the roleForm with validation rules and permission checkboxes
    this.roleForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      permissions: this.buildPermissionCheckboxes(),
      // Add more form controls for other fields as needed
    });
  }

  ngOnDestroy() {
    // Unsubscribe from all observables when the component is destroyed
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  initializeForm(role: Role) {
    this.roleForm.patchValue({
      name: role.name,
      // Update form controls for other fields as needed
    });
  }

  buildPermissionCheckboxes() {
    const permissionCheckboxes: { [permissionId: number]: boolean[] } = {};
    const permissions = this.permissionsSubject.value;
    if (permissions) {
      permissions.forEach((permission) => {
        permissionCheckboxes[permission.id] = [this.roleHasPermission(permission.id)];
      });
    }
    return permissionCheckboxes;
  }

  roleHasPermission(permissionId: number): boolean {
    const role = this.roleSubject.value;
    return role && role.permissions.includes(permissionId.toString());
  }

  updateRole() {
    if (this.roleForm.valid) {
      const updatedRole: Role = {
        id: this.roleId,
        name: this.roleForm.get('name')?.value,
        permissions: this.getSelectedPermissions(),
        // Include other properties and values from the form as needed
      };

      // Call the role service to update the role
      this.roleService.updateRole(updatedRole).subscribe(
        (response) => {
          console.log('Role updated successfully:', response);
          // Optionally, navigate to a different page after successful update
          this.router.navigate(['/roles-list']);
        },
        (error) => {
          console.error('Error updating role:', error);
          // Handle error, display an error message, etc.
        }
      );
    }
  }

  // Helper function to get selected permissions from the form
  private getSelectedPermissions(): string[] {
    const selectedPermissions: string[] = [];
    const formValue = this.roleForm.value;
    const permissionKeys = Object.keys(formValue.permissions);

    permissionKeys.forEach((key) => {
      if (formValue.permissions[key]) {
        selectedPermissions.push(key);
      }
    });

    return selectedPermissions;
  }

  cancelEdit() {
    // Redirect back to the role details page without saving changes
    this.router.navigate(['/roles', this.roleId]);
  }
  
}
