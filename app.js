// Clase Libro que representa cada libro
class Libro {
    constructor(titulo, autor, paginas) {
        this.titulo = titulo;
        this.autor = autor;
        this.paginas = paginas;
    }
}

// Clase UI para manejar la interfaz de usuario
class UI {
    static mostrarLibros() {
        const libros = Store.obtenerLibros();
        libros.forEach((libro) => UI.agregarLibroLista(libro));
    }

    static agregarLibroLista(libro) {
        const lista = document.querySelector('#bookList');

        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${libro.titulo}</td>
            <td>${libro.autor}</td>
            <td>${libro.paginas}</td>
            <td><button class="delete-btn">Eliminar</button></td>
        `;

        lista.appendChild(fila);
    }

    static eliminarLibro(el) {
        if (el.classList.contains('delete-btn')) {
            el.parentElement.parentElement.remove();
        }
    }

    static limpiarCampos() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#pages').value = '';
    }
}

// Clase Store para manejar el almacenamiento de datos
class Store {
    static obtenerLibros() {
        return localStorage.getItem('libros') ? JSON.parse(localStorage.getItem('libros')) : [];
    }

    static agregarLibro(libro) {
        const libros = Store.obtenerLibros();
        libros.push(libro);
        localStorage.setItem('libros', JSON.stringify(libros));
    }

    static removerLibro(titulo) {
        const libros = Store.obtenerLibros();
        const nuevosLibros = libros.filter(libro => libro.titulo !== titulo);
        localStorage.setItem('libros', JSON.stringify(nuevosLibros));
    }
}

// Eventos para mostrar libros
document.addEventListener('DOMContentLoaded', UI.mostrarLibros);

// Evento para agregar un libro
document.querySelector('#bookForm').addEventListener('submit', (e) => {
    e.preventDefault();

    // Obtener valores de los campos
    const titulo = document.querySelector('#title').value;
    const autor = document.querySelector('#author').value;
    const paginas = document.querySelector('#pages').value;

    // Validar campos
    if (titulo === '' || autor === '' || paginas === '') {
        alert('Por favor, completa todos los campos');
    } else {
        // Crear un nuevo libro y agregarlo a la lista y al almacenamiento
        const libro = new Libro(titulo, autor, paginas);
        UI.agregarLibroLista(libro);
        Store.agregarLibro(libro);
        UI.limpiarCampos();
    }
});

// Evento para eliminar un libro
document.querySelector('#bookList').addEventListener('click', (e) => {
    UI.eliminarLibro(e.target);

    const titulo = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
    Store.removerLibro(titulo);
});
