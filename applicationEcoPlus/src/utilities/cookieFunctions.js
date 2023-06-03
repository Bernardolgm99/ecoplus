
export const cookie = {
    createTokenOnCookie(token) {
        document.cookie = `token=${token};expires=${new Date(new Date().getTime() + 86400000)};path=/`;
    },
    
    getCookie(query) {
        const value = ';' + document.cookie;
        const parts = value.split(';' + query + '=');
        if (parts.length === 2) {
            return parts.pop().split(";").shift();
        } else {
            return false;
        };
    }
}