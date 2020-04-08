import Papa from 'papaparse';

import resource from './resource';

/**
 * Downloads given CSV file.
 * 
 * @param {string} url csv file
 */
export default async function(url, opts = {
  onStep: undefined,
  notResource: false,
}) {
  return new Promise((resolve, reject) => {
    Papa.parse(opts.notResource ? url : resource(url), {
      // worker: true,
      header: true,
      quotes: false,
      delimiter: ',',
      download: true,
      error: (err) => {
        console.error(`fetchCsv: error on ${url}`, { err });
        reject(err.message);
      },
      complete: (res) => {
        if (res.errors.length > 0) {
          return reject(res.errors[0]);
        }
        resolve(res.data);
      },
    });
  })
}
