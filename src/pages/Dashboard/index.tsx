import React from 'react'
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button'
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  return (
<>
 <h1>Dashboard</h1>
 
  <Button variant="contained" onClick={signOut}>Sair</Button>
  
  

</>
  );
}


export default Dashboard;