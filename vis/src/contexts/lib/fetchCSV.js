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
      worker: true,
      header: true,
      step: opts.onStep,
      error: (err) => {
        console.error(`fetchCsv: error on ${url}`, { err });
        reject(err.message);
      },
      complete: (res) => {
        resolve(res.data);
      },
    });
  })
}
