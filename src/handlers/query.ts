export function queryString(url){
    return new URL("http://example.com"+url).searchParams;
}