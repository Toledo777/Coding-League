import React from 'react';

// component to display form to edit user data, takes a user as input to prepopulate form
export default function EditForm({user}) {

    function handleSubmit(e) {
        e.preventDefault();
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="formUsername">Username:</label>
                <input type="text" name="formUsername" id="formUsername" value={user.username}/>

                <label htmlFor="formAvatar">Avatar link:</label>
                <input type="text" name="formAvatar" id="formAvatar" value={user.avatar}/>

                <label htmlFor="formBio">Bio:</label>
                <input type="text" name="formBio" id="formBio" value={user.bio}/>

                <input type="button" name="submitBtn" id="submitBtn" value="Confirm"/>
            </form>
        </>
    )
}