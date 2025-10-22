"use strict";

// Muestra el toast interactivo añadiendo la clase `md:block` si existe el elemento
const showToast = () => {
	const toast = document.getElementById('toast-interactive');
	if (!toast) return false;
	toast.classList.remove('hidden');
	toast.classList.add('md:block');
	return true;
};

// Muestra el video en una nueva pestaña cuando el botón demo es clickeado
const showVideo = () => {
  const btn = document.getElementById('demo');
  if (!btn) return false;
  const videoUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.open(videoUrl, '_blank', 'noopener,noreferrer');
  });
  return true;
};

(function welcomeMessage() {
	// En lugar de alert/console.log, mostramos la notificación tipo toast
	showToast();
	showVideo();
})();
