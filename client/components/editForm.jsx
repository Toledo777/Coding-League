import React from 'react';
import { useState, useEffect } from 'react';
import usePut from '../hooks/usePut';

// component to display form to edit user data, takes a user as input to prepopulate form
export default function EditForm({user}) {
    const [updatedUser, setUpdatedUser] = useState(user);

    // this is the data that is displayed and present in the form
    const [formData, setFormData] = useState(user);
    // const [error, loading, data] = usePut("/api/user/update", updatedUser, user);


    // if the user ever gets changed, update the form and the updatedUser
    // user props is the source of truth
    useEffect(() => {
        // setUpdatedUser(user);
        setFormData(user);
      }, [user]);


    function handleSubmit(e) {
        e.preventDefault();

        // update the user with new data from form if any
        console.log(formData);
        setUpdatedUser({ ...updatedUser, ...formData });
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="formUsername">Username:</label>
                <input type="text" name="formUsername" id="formUsername" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })}/>

                <label htmlFor="formAvatar">Avatar link:</label>
                <input type="text" name="formAvatar" id="formAvatar" value={formData.avatar} onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}/>

                <label htmlFor="formBio">Bio:</label>
                <input type="text" name="formBio" id="formBio" value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })}/>

                <input type="submit" name="submitBtn" id="submitBtn" value="Confirm"/>
            </form>
        </>
    )
}