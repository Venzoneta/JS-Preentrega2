const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modalContainer");

// Cargar el carrito desde localStorage o inicializarlo si está vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para guardar el carrito en localStorage
const saveLocalStorage = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

// Recorro el array de productos para mostrarlos
productos.forEach((product) => {
  let content = document.createElement("div");
  content.className = "card";
  content.innerHTML = `
  <div class="image-container">  
    <img src="${product.img}">
  </div>  
    <h3>${product.nombre}</h3>
    <p>$${product.precio}</p>`;

  shopContent.append(content);

  let comprar = document.createElement("button");
  comprar.innerText = "Agregar";
  comprar.className = "comprar";

  content.append(comprar);

  comprar.addEventListener("click", () => {
    carrito.push({
      id: product.id,
      nombre: product.nombre,
      precio: product.precio,
    });
    saveLocalStorage(); // Guardar el carrito actualizado en localStorage
    console.log(carrito);
  });
});

verCarrito.addEventListener("click", () => {
  modalContainer.innerHTML = "";
  modalContainer.style.display = "flex";
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  modalHeader.innerHTML = ` 
  <h1 class="modalHeader-titulo">Tu carrito:</h1>`;
  modalContainer.append(modalHeader);

  const modalButton = document.createElement("h2");
  modalButton.innerText = "Cerrar";
  modalButton.className = "modal-header-button";

  modalButton.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });

  modalHeader.append(modalButton);

  // Recorro el carrito y muestro los productos en el modal
  carrito.forEach((product) => {
    let carritoContent = document.createElement("div");
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `
    <h3>${product.nombre}:</h3>
    <p>$${product.precio}</p>
  `;

    modalContainer.append(carritoContent);
  });

  const total = carrito.reduce((acc, el) => acc + el.precio, 0);

  const totalBuying = document.createElement("div");
  totalBuying.className = "total-content";
  totalBuying.innerHTML = `Total de tu compra: $${total}`;
  modalContainer.append(totalBuying);
});
