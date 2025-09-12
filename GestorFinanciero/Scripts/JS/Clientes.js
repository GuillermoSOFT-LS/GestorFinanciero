document.addEventListener('DOMContentLoaded', function () {
    // Inicializar Modal
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    // Inicializar Select
    var selects = document.querySelectorAll('select');
    M.FormSelect.init(selects);
});

window.onload = function () {
    ShowClients();
}

function ShowClients() {
    Pintar({
        url: UrlShow,
        cabeceras: ['ID Cliente', 'Nombre', 'Documento', 'Correo', 'Telefono', 'Estado', 'Registro'],
        Datos: ['IdCliente', 'Nombre', 'Documento', 'Correo', 'Telefono', 'Estado', 'FechaRegistro'],
        Id: 'TablaClientes',
    });
}

function Empty() {
    var cliente = {
        Nombre: document.getElementById("nombre").value = "",
        Documento: document.getElementById("documento").value = "",
        Correo: document.getElementById("correo").value = "",
        Telefono: document.getElementById("telefono").value = "",
        Estado: document.getElementById("estado").value === "1"
    };
}

function RegistrarCliente() {
    var cliente = {
        Nombre: document.getElementById("nombre").value,
        Documento: document.getElementById("documento").value,
        Correo: document.getElementById("correo").value,
        Telefono: document.getElementById("telefono").value,
        Estado: document.getElementById("estado").value === "1"
    };

    fetch(UrlInsert, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(cliente)
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                M.toast({ html: "Cliente registrado con éxito", classes: "green" });
                ShowClients();
                Empty();
            }
        })
        .catch(err => console.error(err));
}

// 🔎 Búsqueda en vivo
document.getElementById("search").addEventListener("keyup", function () {
    let documento = this.value.trim();

    if (documento === "") {
        ShowClients();
        return;
    }

    Pintar({
        url: UrlSelectClient + '?Documento=' + encodeURIComponent(documento),
        cabeceras: ['ID Cliente', 'Nombre', 'Documento', 'Correo', 'Telefono', 'Estado', 'Registro'],
        Datos: ['IdCliente', 'Nombre', 'Documento', 'Correo', 'Telefono', 'Estado', 'FechaRegistro'],
        Id: 'TablaClientes',
    });
});