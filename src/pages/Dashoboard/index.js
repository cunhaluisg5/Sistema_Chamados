import {useContext} from 'react';

import {AuthContext} from '../../contexts/auth';

function Dashboard(){
    const {logout} = useContext(AuthContext);
    return(
        <div>
            <h1>PÁGINA DASHBOARD</h1>
            <button onClick={()=> logout()}>Fazer logout</button>
        </div>
    )
}

export default Dashboard;