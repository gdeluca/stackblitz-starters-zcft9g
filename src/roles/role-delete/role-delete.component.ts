import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../role.service';
import { DialogService } from '../../delete-confirmation/dialog.service';


@Component({
  selector: 'app-role-delete',
  templateUrl: './role-delete.component.html',
  styleUrls: ['./role-delete.component.css'],
})
export class RoleDeleteComponent implements OnInit {
  roleId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roleService: RoleService,
    private dialogService: DialogService,

  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.roleId = +params['id']; // Get the role ID from the route parameters
    });
  }

  onDeleteRole() {
    this.roleService.deleteRole(this.roleId).subscribe(() => {
      // Role deleted successfully, navigate to a different page or component
      this.router.navigate(['/roles-list']);
    });
  }

  cancelDelete() {
    // Redirect to the RoleDetailsComponent or any other page as needed
    this.router.navigate(['/roles-list']);
  }


  confirmDelete() {
    // Open the delete confirmation dialog
    this.dialogService.openDeleteConfirmation();
  }
}
