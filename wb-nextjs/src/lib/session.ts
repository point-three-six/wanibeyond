import { cookies } from 'next/headers';

export const isLoggedIn = async () => {
    const nxtCookies = cookies();
    return (nxtCookies.has('sessionid'));
}