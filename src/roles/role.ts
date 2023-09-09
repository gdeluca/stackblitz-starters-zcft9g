export interface Role {
  id: number;
  name: string;
  permissions: string[]; // Assuming permissions are stored as strings, you can adjust the type as needed
}
