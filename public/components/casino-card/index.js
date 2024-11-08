import { openDialog } from '../dialog/index.js';

const template = document.getElementById('casino-review-template');

export function casinoCard(data) {
    const clone = template.content.cloneNode(true);

    const logoImg = clone.querySelector('.casino-logo img');
    logoImg.src = './images/' + data.logo;

    const name = clone.querySelector('h3');
    name.textContent = data.name;

    const newBadge = clone.querySelector('.new-badge');
    newBadge.classList.toggle('hidden', !data.isNew);

    const ratingValue = clone.querySelector('.rating-value');
    ratingValue.textContent = data.rating;

    const ratingElement = clone.querySelector('.rating');
    const ratingFloored = Math.floor(data.rating);
    for (let i = 1; i <= 5; i++) {
      const starDiv = document.createElement('div');
      starDiv.classList.toggle('active', i <= ratingFloored);
      ratingElement.appendChild(starDiv);
    }

    const visitButton = clone.querySelector('.visit-button a');
    visitButton.href = data.link;

    const badgesElement = clone.querySelector('.badges');
    data.badges.forEach(badge => {
      const badgeDiv = document.createElement('div');
      badgeDiv.classList.add('badge');
      badgeDiv.textContent = badge.title;
      badgeDiv.addEventListener('click', (event) => {
        openDialog(event, {
          title: `${badge.title} at ${data.name}`,
          code: badge.code,
          gamesAllowed: data.gamesAllowed.join(', '),
          maxCashOut: data.maxCashOut,
          minDeposit: data.minDeposit
        });
      });
      badgesElement.appendChild(badgeDiv);
    });

    return clone;
}