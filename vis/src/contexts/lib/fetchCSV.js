import Papa from 'papaparse';

/**
 * Downloads given CSV file.
 * 
 * @param {string} url csv file
 */
export default async function(url, opts = {
  onStep: undefined,
}) {
  return new Promise((resolve, reject) => {
    Papa.parse(url, {
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
        console.log(res);
        resolve(res.data);
      },
    });
  })
}
