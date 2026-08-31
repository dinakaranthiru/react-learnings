import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Users from './Users'
import CounterDisplay from './CounterDisplay';
import CounterButtons from './CounterButton';
import Double from './Double';
import LoginForm from './LoginForm';


const queryClient = new QueryClient()

function App() {
  // return (
  //   <QueryClientProvider client={queryClient}>
  //     <Users />
  //   </QueryClientProvider>
  // );
   return (
    <div style={{ textAlign: "center", margin: "50px"}}>
      {/* <h1>Zustand Counter Example</h1> */}
      <CounterDisplay />
      <CounterButtons />
      <Double/>
      <LoginForm/>
    </div>
  );
}

export default App