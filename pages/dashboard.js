import React from 'react';
import { signOut, useSession } from "next-auth/react"

const Dashboard = () => {
    const { data: session, status } = useSession()
    console.log(session)
    return (
        <div>
            <h1>hello this is {session?.user.name}</h1>
            <button onClick={() => 
                signOut()
                  }>Sign out</button>
        </div>
    );
};

export default Dashboard;