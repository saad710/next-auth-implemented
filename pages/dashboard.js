import React from 'react';
import { useSession } from "next-auth/react"

const Dashboard = () => {
    const { data: session, status } = useSession()
    console.log(session)
    return (
        <div>
            
        </div>
    );
};

export default Dashboard;