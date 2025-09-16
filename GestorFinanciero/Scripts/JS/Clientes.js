document.addEventListener('DOMContentLoaded', function () {
    // Inicializar modales
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    // Inicializar selects
    var selects = document.querySelectorAll('select');
    M.FormSelect.init(selects);
});

// Delegación de eventos para botón Editar
document.addEventListener("click", function (e) {
    let btn = e.target.closest(".btn-edit");
    if (btn) {
        let documento = btn.dataset.documento;
        cargarCliente(documento);
    }
});

function cargarCliente(id) {
    fetch(URLGetClientById + "?id=" + id)
        .then(res => res.json())
        .then(cliente => {
            if (cliente) {
                document.getElementById("editIdCliente").value = cliente.IdCliente;
                document.getElementById("NombreEdit").value = cliente.Nombre;
                document.getElementById("DocumentoEdit").value = cliente.Documento;
                document.getElementById("CorreoEdit").value = cliente.Correo;
                document.getElementById("TelefonoEdit").value = cliente.Telefono;
                document.getElementById("EstadoEdit").value = cliente.Estado ? "1" : "0";

                M.updateTextFields();
                M.FormSelect.init(document.querySelectorAll('select'));
            }
        })
        .catch(err => console.error("Error cargando cliente:", err));
}