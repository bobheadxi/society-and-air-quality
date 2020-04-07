/**
 * Downloads JSON asset
 * 
 * @param {string} url resource to fetch
 */
export default async function(url) {
    try {
        const resp = await fetch(url, {
            method: 'GET',
            mode: 'no-cors',
        });
        return resp.json();
    } catch (err) {
        console.error(`fetchJSON: error on ${url}`, err);
        throw err;
    }
}
