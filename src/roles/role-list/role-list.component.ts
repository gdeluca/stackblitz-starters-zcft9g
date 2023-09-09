import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Role } from '../role';
import { RoleService } from '../role.service';

// Import your Role and Permission models and any necessary services here

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css'],
})
export class RoleListComponent implements OnInit {
  // Define the data source for the table
  dataSource: MatTableDataSource<Role> = new MatTableDataSource<Role>([]);
  displayedColumns: string[] = ['id', 'name', 'permissions', 'actions'];

  // Pagination and sorting
  @ViewChild(MatPaginator,{ static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  pageSize = 10;
  pageIndex = 0;
  totalRoles = 0;

  constructor(private roleService: RoleService) {
  } // Inject your RoleService or appropriate service

  ngOnInit() {
    // Fetch data from your service and set up the data source
    this.fetchRoles();
  }

  fetchRoles() {
    // Fetch roles from your service, update the totalRoles count and set the data source
    this.roleService.getRoles().subscribe((roles: Role[]) => {
      this.totalRoles = roles.length;
      this.dataSource = new MatTableDataSource<Role>(roles);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onPageChange(event: any) {
    // Handle page change event
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    // Fetch roles for the new page
    this.fetchRoles();
  }

  // Implement sorting and any other necessary functions
}
