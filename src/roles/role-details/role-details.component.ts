import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Role } from '../role';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.css'],
})
export class RoleDetailsComponent implements OnInit {
  role: Role = { id: 0, name: '', permissions: [] };

  constructor(private route: ActivatedRoute, private roleService: RoleService) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const roleId = +params['id']; // Get the role ID from the route parameters

      this.roleService.getRoleById(roleId).subscribe((role) => {
        this.role = role;
      });
    });
  }
}
