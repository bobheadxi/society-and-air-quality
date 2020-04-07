import { DEVELOPMENT } from '../../vars';

// see package.json "homepage"
const homepage = 'https://bobheadxi.dev/eosc410-project';

/**
 * TODO figure out what to do about this
 * 
 * @param {string} path path to resource
 */
export default function(path) {
    if (!DEVELOPMENT) {
        const alt = `${homepage}${path}`;
        console.log(`resource: replacing ${path} with ${alt}`, { DEVELOPMENT });
        return alt;
    }
    return path;
}
