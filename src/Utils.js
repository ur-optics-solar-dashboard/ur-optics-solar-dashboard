export const setAuthToken = (token) => {
    sessionStorage.setItem('access_token', token);
    window.dispatchEvent(new Event('storage'));
}

export const getAuthToken = () => {
    return sessionStorage.getItem('access_token');
}

export const clearAuthToken = () => {
    sessionStorage.removeItem('access_token');
    window.dispatchEvent(new Event('storage'));
}