window.onload = function () {
    ShowClients();
}

function ShowClients() {
    Pintar({
        url: URLClientes,
        cabeceras: ['ID Cliente', 'Nombre', 'Documento', 'Correo', 'Telefono', 'Estado', 'Registro'],
        Datos: ['IdCliente', 'Nombre', 'Documento', 'Correo', 'Telefono', 'Estado', 'FechaRegistro'],
        Id: 'TablaClientes',
    });
}