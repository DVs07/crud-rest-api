import { obtenerCliente, editarCliente } from './API.js';
import { mostrarAlerta, validar } from './funciones.js';
(function () {
    // Campos del formulario
    const nombreInput = document.querySelector('#nombre');
    const emailInput = document.querySelector('#email');
    const telefonoInput = document.querySelector('#telefono');
    const empresaInput = document.querySelector('#empresa');
    const idInput = document.querySelector('#id');
    const formulario = document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded', async() => {
        const parametrosURL = new URLSearchParams(window.location.search);

        const idCliente = parseInt(parametrosURL.get('id'));

        // console.log(idCliente);

        const cliente = await obtenerCliente(idCliente);

        // console.log(cliente);
        
        mostrarCliente(cliente);

        formulario.addEventListener('submit', validarCliente);
    });

    function mostrarCliente(cliente) {
        // console.log(cliente);
        const { nombre, email, telefono, empresa, id } = cliente;

        nombreInput.value = nombre;
        emailInput.value = email;
        telefonoInput.value = telefono;
        empresaInput.value = empresa;
        idInput.value = id;

    }

    function validarCliente(e) {
        e.preventDefault();

        const cliente = {
            nombre: nombreInput.value,
            email: emailInput.value,
            telefono: telefonoInput.value,
            empresa: empresaInput.value,
            id: parseInt(idInput.value)
        }
        
        // console.log(cliente);
        

        if(validar(cliente)){
            mostrarAlerta('Todos los campos son obligatorios');                    
            return
        }

        editarCliente(cliente);
    }
})();