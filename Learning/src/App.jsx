import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import UsersTable from './UserTable';
import EditUserForm from './EditUserForm';


function App() {
  return (
    <div className="p-m-5">
      <h1>User Management App</h1>
      <UsersTable />
      <EditUserForm />
    </div>
  );
}

export default App;