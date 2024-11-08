const dialog = document.getElementById('dialog');

const closeDialogButton = dialog.querySelector('.button');
closeDialogButton.addEventListener('click', closeDialog);

const ARROW_SIZE = 10;

export function openDialog(event, data) {
  codeCopied.classList.add('hidden');
  clearTimeout(hideTimeout);
  dialog.classList.add('hidden');
  
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  const buttonRect = event.target.getBoundingClientRect();
  
  const buttonMidpoint = buttonRect.left + scrollLeft + buttonRect.width / 2;
  
  const left = buttonMidpoint - dialog.offsetWidth / 2 + ARROW_SIZE / 2;
  const top = buttonRect.bottom + ARROW_SIZE;
  const bottom = buttonRect.top - dialog.offsetHeight - ARROW_SIZE;

  const bottomSpaceAvailable = window.innerHeight - top - dialog.offsetHeight;
  const isBottom = bottomSpaceAvailable >= ARROW_SIZE;

  dialog.classList.toggle('arrow-top', isBottom);
  dialog.classList.toggle('arrow-bottom', !isBottom);

  dialog.style.left = `${left}px`;
  dialog.style.top = isBottom ? `${top + scrollTop}px` : `${bottom + scrollTop}px`;

  dialog.querySelector('.title').textContent = data.title;
  dialog.querySelector('.code').textContent = data.code;
  dialog.querySelector('.games.value').textContent = data.gamesAllowed;
  dialog.querySelector('.cache-out.value').textContent = `$${data.maxCashOut}`;
  dialog.querySelector('.deposit.value').textContent = data.minDeposit ? `$${data.minDeposit}` : `FREE`;
  dialog.querySelector('.deposit.value').classList.toggle('free-value', data.minDeposit === 0);

  dialog.classList.remove('hidden');

  window.addEventListener('click', closeHandler);
}

const code = dialog.querySelector('.code');
const codeCopied = dialog.querySelector('.code-copied');
code.addEventListener('click', copyToClipboard);
let hideTimeout;

function copyToClipboard() {
  const range = document.createRange();
  range.selectNode(code);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand('copy');
  window.getSelection().removeAllRanges();

  codeCopied.classList.remove('hidden');
  hideTimeout = setTimeout(() => codeCopied.classList.add('hidden'), 2000);
}

function closeHandler(event) {
  if (!event.target.closest('.badge') && !event.target.closest('.dialog-container')) {
    closeDialog();
  }
}

function closeDialog() {
  dialog.classList.add('hidden');
  codeCopied.classList.add('hidden');
  clearTimeout(hideTimeout);
  window.removeEventListener('click', closeHandler);
}
