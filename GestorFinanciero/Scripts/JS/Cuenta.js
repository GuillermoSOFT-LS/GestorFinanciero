document.addEventListener('DOMContentLoaded', function () {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var selects = document.querySelectorAll('select');
    M.FormSelect.init(selects);

    const btnBuscar = document.getElementById("btnBuscarCliente");
    const inputDocumento = document.getElementById("DocumentoBuscar");
    const inputNombre = document.getElementById("NombreInsert");

    btnBuscar.addEventListener("click", function () {
        const documento = inputDocumento.value.trim();

        if (!documento) {
            showAlert("Debes ingresar un documento", "warning");
            return;
        }

        fetch(UrlSearchClient+'?documento=' + encodeURIComponent(documento))
            .then(response => {
                if (!response.ok) throw new Error("Error HTTP " + response.status);
                return response.json();
            })
            .then(data => {
                if (data && data.success) {
                    inputNombre.value = data.nombre;
                    M.updateTextFields();
                    showAlert("Cliente encontrado: " + data.nombre, "info");
                } else {
                    inputNombre.value = "";
                    M.updateTextFields();
                    showAlert("Cliente no encontrado", "danger");
                }
            })
            .catch(err => {
                console.error("Error en fetch:", err);
                showAlert("Error al buscar cliente", "danger");
            });
    });
});
