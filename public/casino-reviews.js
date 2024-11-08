import { loadData } from './utils.js';
import { toggleSkeleton } from './components/skeleton/index.js';
import { casinoCard } from './components/casino-card/index.js';

const casinoList = document.querySelector('.casino-list');
const loadMoreButton = document.querySelector('.load-more button');

function appendCasinoDataToList(data) {
  data.forEach(item => {
    const clone = casinoCard(item);
    casinoList.appendChild(clone);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  toggleSkeleton();
  loadData('./mock-data1.json').then(data => {
    appendCasinoDataToList(data);
    toggleSkeleton();
  }).finally(() => {
    loadMoreButton.disabled = false;
  });
});

loadMoreButton.addEventListener('click', () => {
  loadMoreButton.disabled = true;
  toggleSkeleton();
  loadData('./mock-data2.json').then(data => {
    appendCasinoDataToList(data);
    toggleSkeleton();
  }).finally(() => {
    loadMoreButton.disabled = false;
  });
});
