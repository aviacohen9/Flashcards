
import {  read_cookie } from 'sfcookies';

/**
 * @returns {Object {User {token:String, firstName:String}}} from cookies
 */

export const userLoader =  () => {
    const cookie_key = 'flash_user';
    if(read_cookie(cookie_key).length!==0)
        return read_cookie(cookie_key)
    return null;
}