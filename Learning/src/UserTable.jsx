import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useQuery } from '@tanstack/react-query';
import useStore from './store/useStore';
import { fetchUsers } from './api/fetchUsers';



export default function UsersTable() {
  const { data: users, isLoading, isError } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
  refetchOnWindowFocus:false

});
  const setSelectedUser = useStore((state) => state.setSelectedUser);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching users</p>;

  return (
    <DataTable value={users}  className="p-mt-4">
      <Column field="id" header="ID" />
      <Column field="name" header="Name" />
      <Column field="email" header="Email" />
      <Column
        header="Actions"
        body={(rowData) => (
          <Button
            label="Edit"
            icon="pi pi-pencil"
            onClick={() => setSelectedUser(rowData)}
          />
        )}
      />
    </DataTable>
  );
}