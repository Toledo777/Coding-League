import React from 'react';
import { useState, useEffect } from 'react';
import usePut from '../hooks/usePut';

// component to display form to edit user data, takes a user as input to prepopulate form
export default function EditForm({user}) {
    const [updatedUser, setUpdatedUser] = useState(user);
    // const [error, loading, data] = usePut("/api/user/update", updatedUser, user);


    // if the user ever gets changed, directly call setUpdatedUser
    useEffect(() => {
        setUpdatedUser(user);
      }, [user]);

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formUsername = formData.get("formUsername");
        const formAvatar = formData.get("formAvatar");
        const formBio = formData.get("formBio");
        
        const formUser = {username: formUsername, avatar: formAvatar, bio: formBio};

        // update the user with new data from form if any
        setUpdatedUser({ ...updatedUser, ...formUser });
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="formUsername">Username:</label>
                <input type="text" name="formUsername" id="formUsername" value={updatedUser.username}/>

                <label htmlFor="formAvatar">Avatar link:</label>
                <input type="text" name="formAvatar" id="formAvatar" value={updatedUser.avatar}/>

                <label htmlFor="formBio">Bio:</label>
                <input type="text" name="formBio" id="formBio" value={updatedUser.bio}/>

                <input type="submit" name="submitBtn" id="submitBtn" value="Confirm"/>
            </form>
        </>
    )
}