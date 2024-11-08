const loadingSkeleton = document.querySelector('.loading-skeleton');

export function toggleSkeleton() {
  loadingSkeleton.classList.toggle('none');
}