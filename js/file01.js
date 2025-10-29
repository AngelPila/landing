"use strict";
import { fetchProducts } from './functions.js';

const showToast = () => {
  const toast = document.getElementById('toast-interactive');
  if (!toast) return false;
  toast.classList.remove('hidden');
  toast.classList.add('md:block');
  return true;
};

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
const renderProducts = () => {
  fetchProducts("https://data-dawm.github.io/datum/reseller/products.json")
    .then((result) => {
      const container = document.getElementById('products-container');
      if (!container) return;

      if (result.success) {
        container.innerHTML = '';

        const products = result.body.slice(0, 6);

        products.forEach((product) => {
          let productHTML = `
    <div class="space-y-4 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
      <img
        class="w-full h-40 bg-gray-300 dark:bg-gray-700 rounded-lg object-cover transition-transform duration-300 hover:scale-[1.03]"
        src="[PRODUCT.IMGURL]" alt="[PRODUCT.TITLE]">
      <h3
        class="h-6 text-xl font-semibold tracking-tight text-gray-900 dark:text-white hover:text-black-600 dark:hover:text-white-400">
        $[PRODUCT.PRICE]
      </h3>
      <div class="h-5 rounded w-full">[PRODUCT.TITLE]</div>
      <div class="space-y-2">
        <a href="[PRODUCT.PRODUCTURL]" target="_blank" rel="noopener noreferrer"
           class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full inline-block">
          Ver en Amazon
        </a>
        <div class="hidden"><span class="1">[PRODUCT.CATEGORY_ID]</span></div>
      </div>
    </div>`;

          const title = product?.title
            ? (product.title.length > 20 ? product.title.substring(0, 20) + '...' : product.title)
            : '';
          const price = product?.price ?? '';
          const imgUrl = product?.img_url || product?.imgUrl || product?.image || '';
          const productUrl = product?.product_url || product?.productUrl || product?.url || '#';
          const categoryId = product?.category_id ?? '';

          productHTML = productHTML
            .replaceAll('[PRODUCT.TITLE]', title)
            .replaceAll('[PRODUCT.PRICE]', String(price))
            .replaceAll('[PRODUCT.IMGURL]', imgUrl)
            .replaceAll('[PRODUCT.PRODUCTURL]', productUrl)
            .replaceAll('[PRODUCT.CATEGORY_ID]', String(categoryId));

          container.insertAdjacentHTML('beforeend', productHTML);
        });
      } else {
        // Show a minimal error state
        container.innerHTML = `<div class="text-center text-sm text-red-600">No se pudieron cargar los productos.</div>`;
      }
    })
    .catch(() => {
      const container = document.getElementById('products-container');
      if (container) {
        container.innerHTML = `<div class="text-center text-sm text-red-600">Error inesperado al cargar los productos.</div>`;
      }
    });
};
let enableForm = () => {
  const form = document.getElementById("form_voting");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const productID = document.getElementById("select_product").value;
      saveVotes(productID)
        .then(response => {
          alert(response.message)
        })
    })
  }
}


(function welcomeMessage() {
  showToast();
  showVideo();
  enableForm();
  renderProducts();
})();
