window.addEventListener("load", () =>
{
    loadCarrito();
});

function loadCarrito() {
    let carritoList = document.getElementById("carritoList");
    carritoList.innerHTML = "";

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let precio = 0;

    carrito.forEach((carr, index) =>
    {

        precio += (carr.costo * carr.cantidad);

        let li = document.createElement("li");
        li.className = "list-group-item";

        li.innerHTML = `
        <div class="d-flex align-items-start gap-3 p-2 position-relative">
            <img src="${carr.imagen}" alt="${carr.nombre}" class="rounded" style="width: 100px; height: auto; object-fit: cover;">
    
            <div class="flex-grow-1">
                <div class="d-flex justify-content-between align-items-start">
                    <h6 class="fw-bold mb-2">${carr.nombre}</h6>
                    <button class="btn btn-sm btn-outline-danger eliminar-btn" onclick="borrarProducto(${index})">
                        Eliminar
                    </button>
                </div>
      
                <p class="text-muted small mb-2">${carr.descripcion}</p>
      
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <span class="badge bg-primary fs-6 p-2">$${carr.costo}</span>
                        <span class="badge bg-secondary ms-1">Cant:
                            <select class="form-select form-select-sm w-auto d-inline-block bg-light border-0 rounded-3 px-4 py-1 fw-semibold" onchange="loadCantidad(this.value, ${carr.id})">
                                <option value="1" ${carr.cantidad == '1' ? 'selected' : ''}>1</option>
                                <option value="2" ${carr.cantidad == '2' ? 'selected' : ''}>2</option>
                                <option value="3" ${carr.cantidad == '3' ? 'selected' : ''}>3</option>
                                <option value="4" ${carr.cantidad == '4' ? 'selected' : ''}>4</option>
                                <option value="5" ${carr.cantidad == '5' ? 'selected' : ''}>5</option>
                                <option value="6" ${carr.cantidad == '6' ? 'selected' : ''}>6</option>
                                <option value="7" ${carr.cantidad == '7' ? 'selected' : ''}>7</option>
                                <option value="8" ${carr.cantidad == '8' ? 'selected' : ''}>8</option>
                                <option value="9" ${carr.cantidad == '9' ? 'selected' : ''}>9</option>
                            </select>
                        </span>
                    </div>
                    <small class="text-secondary">Disp: ${carr.stock}</small>
                </div>
            </div>
        </div>`;

        carritoList.appendChild(li);
    });

    let totalPrecio = document.getElementById("pagoTotal");
    totalPrecio.innerHTML = `<p class="fs-4 fw-bold mb-0">$${precio}</p>`;
}

function loadCantidad(cantidad, id)
{
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    let producto = carrito.find(item => item.id === id);
    producto.cantidad = Number(cantidad);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    loadCarrito();
}

function agregarCarrito(boton, idpeluche) {
    const card = boton.closest('.card');

    let nombre = card.querySelector('.card-title').textContent;
    let descripcion = card.querySelector('.card-text').textContent;
    let costo = card.querySelector('.text-danger').textContent;
    let imagenSrc = card.querySelector('.card-img-top').src;
    let imagen = imagenSrc.substring(imagenSrc.lastIndexOf('/multimedia'));
    let stock = card.querySelector('.badge').textContent;

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    let productoExistente = carrito.find(item => item.id == idpeluche);

    if (productoExistente) {
        console.log("Ya Existe");
    }
    else {
        let id = idpeluche;
        costo = Number(costo.replace('$', ''));
        let cantidad = 0;
        cantidad++;

        let nuevoProducto = { id, nombre, descripcion, costo, imagen, stock, cantidad };

        carrito.push(nuevoProducto);

        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
    loadCarrito();
}

function borrarProducto(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    loadCarrito();
}