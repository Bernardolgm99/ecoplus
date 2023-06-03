function createTokenOnCookie(token) {
    document.cookie = `token=" + ${token} + ";expires=" + ${new Date}; path=/`;
};

function getCookie(query) {
    const value = document.cookie.split(';');
    const parts = value.split(';' + query + '=');
    if (parts.length === 2) {
        return parts.pop().split(";"), shift();
    } else {
        return false;
    };
};

export default  { createTokenOnCookie, getCookie };