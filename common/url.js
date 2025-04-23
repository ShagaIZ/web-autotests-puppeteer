const BASE_URL_API = 'https://api.github.com/'
export const BASE_URL_FRONT = 'https://gh-users-search.netlify.app/'
export const PATH = {
    RATE: 'rate_limit',
    USERS: 'users/'
}
export function getUrlApi(path, user='', query=''){
    return BASE_URL_API + path + user + query
}

