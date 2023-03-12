import React from 'react';

// component to display form to edit user data, takes a user as input to prepopulate form
export default function EditForm({user}) {

    return(
        <form>
            <input type="text" name="username" value={user.username}></input>
            <input type="text" name="avatar" value={user.avatar}></input>
            <input type="text" name="bio" value={user.bio}></input>
        </form>
    )
}