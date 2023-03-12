import React from 'react';

// component to display form to edit user data, takes a user as input to prepopulate form
export default function EditForm({user}) {

    return(
        <form>
            <label htmlFor="formUsername">Username:</label>
            <input type="text" name="formUsername" id="formUsername" value={user.username}></input>

            <label htmlFor="formAvatar">Avatar link:</label>
            <input type="text" name="formAvatar" id="formAvatar" value={user.avatar}></input>

            <label htmlFor="formBio">Bio:</label>
            <input type="text" name="formBio" id="formBio" value={user.bio}></input>
            
            <input type="button" name="submitBtn">Submit</input>
        </form>
    )
}