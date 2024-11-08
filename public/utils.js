const LOAD_DELAY = 1000;
const TOTAL_PAGES = 3;

let pagesLoaded = 0;

const loadMoreButton = document.querySelector('.load-more button');

export function loadData(url) {
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network error.');
    })
    .then(data =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve(data);
        }, LOAD_DELAY);
      })
    )
    .then(data => {
      pagesLoaded++;
      if (pagesLoaded === TOTAL_PAGES) {
        loadMoreButton.classList.add('none');
      }
      return data;
    });
}
