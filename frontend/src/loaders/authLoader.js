
import { redirect  } from "react-router-dom";
import {  read_cookie } from 'sfcookies';

/**
 * Checks cookies to validate credantials before the component renders in order to prevent an authenticated user access to login/sign up again
 * @returns null if the user authenticated
 * otherwise redirect the user to dashboard
 */

export const authLoader =  () => {
    const cookie_key = 'flash_user';
    if(read_cookie(cookie_key).length!==0)
        return redirect("/homepage");
    return null;
}