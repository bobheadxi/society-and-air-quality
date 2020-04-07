import resource from './resource';

/**
 * Downloads JSON asset
 * 
 * @param {string} url resource to fetch
 */
export default async function(url, opts = {
    notResource: false,
}) {
    try {
        const resp = await fetch(opts.notResource ? url : resource(url), {
            method: 'GET',
            mode: 'no-cors',
        });
        return resp.json();
    } catch (err) {
        console.error(`fetchJSON: error on ${url}`, err);
        throw err;
    }
}
