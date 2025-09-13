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
        cabeceras: ['ID Cliente', 'Nombre', 'Documento', 'Correo', 'Telefono', 'Estado', 'Registro', 'Acciones'],
        Datos: ['IdCliente', 'Nombre', 'Documento', 'Correo', 'Telefono', 'Estado', 'FechaRegistro'],
        Id: 'TablaClientes',
        Acciones: function (item) {
            return `
                <button class="btn-small blue" onclick="EditarCliente(${item.IdCliente}, '${item.Nombre}', '${item.Documento}', '${item.Correo}', '${item.Telefono}', ${item.Estado})">
                    <i class="material-icons">edit</i>
                </button>
            `;
        }
    });
}

function Empty() {
    document.getElementById("nombre").value = "";
    document.getElementById("documento").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("estado").value = "1";
    M.FormSelect.init(document.querySelectorAll('select'));
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
                M.toast({ html: "Cliente registrado con éxito", classes: "green"});
                ShowClients();
                Empty();
            }
        })
        .catch(err => console.error(err));
}

// Cargar datos al modal de edición
function EditarCliente(id, nombre, documento, correo, telefono, estado) {
    document.getElementById("editIdCliente").value = id;
    document.getElementById("editNombre").value = nombre;
    document.getElementById("editDocumento").value = documento;
    document.getElementById("editCorreo").value = correo;
    document.getElementById("editTelefono").value = telefono;
    document.getElementById("editEstado").value = estado ? "1" : "0";

    M.updateTextFields();
    M.FormSelect.init(document.querySelectorAll('select'));

    var modal = M.Modal.getInstance(document.getElementById("modalEditCliente"));
    modal.open();
}
// Guardar cambios
function ActualizarCliente() {
    var cliente = {
        IdCliente: parseInt(document.getElementById("editIdCliente").value, 10),
        Nombre: document.getElementById("editNombre").value,
        Documento: document.getElementById("editDocumento").value,
        Correo: document.getElementById("editCorreo").value,
        Telefono: document.getElementById("editTelefono").value,
        Estado: document.getElementById("editEstado").value === "1"
    };

    fetch(UrlUpdate, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(cliente)
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                M.toast({ html: "Cliente actualizado con éxito", classes: "green" });

                ShowClients();

      
                var modalElem = document.getElementById("modalEditCliente");
                var modalInstance = M.Modal.getInstance(modalElem);
                modalInstance.close();

         
                document.getElementById("editIdCliente").value = "";
                document.getElementById("editNombre").value = "";
                document.getElementById("editDocumento").value = "";
                document.getElementById("editCorreo").value = "";
                document.getElementById("editTelefono").value = "";
                document.getElementById("editEstado").selectedIndex = 0;

                // refrescar estilos de Materialize
                M.updateTextFields();
                M.FormSelect.init(document.querySelectorAll("select"));
            } else {
                M.toast({ html: "Error al actualizar cliente", classes: "red" });
                ShowClients();
            }
        })
        .catch(err => {
            console.error(err);
            M.toast({ html: "Error de red al actualizar", classes: "red" });
           
        });
}


//Búsqueda en vivo
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
