const isIncludeText = (fullText: string, searchText?: string): boolean => {
    if(!searchText){
        return true;
    }

    return fullText?.toLowerCase().includes(searchText?.toLowerCase());
};

const getDataFormToken = <T = Record<string,any>>(token: string = ''): T => {
    if(!token) return {} as T;

    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

const stringHelpers = {
    isIncludeText,
    getDataFormToken
};

export default stringHelpers;
