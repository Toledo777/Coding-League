import React from 'react';

// component to display form to edit user data, takes a user as input to prepopulate form
export default function EditForm({user}) {

    return(
        <form>
            <label for="username">Username:</label>
            <input type="text" name="username" value={user.username}></input>

            <label for="avatar">Avatar link:</label>
            <input type="text" name="avatar" value={user.avatar}></input>

            <label for="bio">Bio:</label>
            <input type="text" name="bio" value={user.bio}></input>
            <input type="button" name="submitBtn">Submit</input>
        </form>
    )
}