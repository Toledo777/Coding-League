import React from 'react';
import useFetch from '../hooks/useFetch';


// component to display user data, take user as inpt
export default function user({user}) {
    const [userErr, userLoading, user] = useFetch('/api/user/username?=' + username, '');

    return(
        <div>
           

        </div>
    )
}