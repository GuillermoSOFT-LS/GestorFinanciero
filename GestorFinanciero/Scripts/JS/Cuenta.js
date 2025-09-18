document.addEventListener('DOMContentLoaded', function () {
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var selects = document.querySelectorAll('select');
    M.FormSelect.init(selects);

    const btnBuscar = document.getElementById("btnBuscarCliente");
    const inputDocumento = document.getElementById("DocumentoBuscar");
    const inputNombre = document.getElementById("NombreInsert");
    const inputIdCliente = document.getElementById("IdClienteInsert");
    const form = document.getElementById("formInsertCliente");

    // Evitar listeners duplicados (por si se abre el modal varias veces)
    btnBuscar.replaceWith(btnBuscar.cloneNode(true));
    const newBtnBuscar = document.getElementById("btnBuscarCliente");

    newBtnBuscar.addEventListener("click", function () {
        const documento = inputDocumento.value.trim();

        if (!documento) {
            showAlert("Debes ingresar un documento", "warning");
            return;
        }

        fetch('/Cuenta/SelectClientDocument?documento=' + encodeURIComponent(documento))
            .then(response => {
                if (!response.ok) throw new Error("Error HTTP " + response.status);
                return response.json();
            })
            .then(data => {
                if (data && data.success) {
                    inputNombre.value = data.nombre;
                    inputIdCliente.value = data.idCliente; 
                    M.updateTextFields();
                    showAlert("Cliente encontrado: " + data.nombre, "success");
                } else {
                    inputNombre.value = "";
                    inputIdCliente.value = "";
                    M.updateTextFields();
                    showAlert("Cliente no encontrado", "danger");
                }
            })
            .catch(err => {
                console.error("Error en fetch:", err);
                showAlert("Error al buscar cliente", "danger");
            });
    });

    // Enviar formulario de inserción de cuenta
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        if (!inputIdCliente.value) {
            showAlert("Debes buscar y seleccionar un cliente primero", "warning");
            return;
        }

        if (!form.TipoCuenta.value) {
            showAlert("Debes seleccionar el tipo de cuenta", "warning");
            return;
        }

        if (!form.Saldo.value || parseFloat(form.Saldo.value) < 0) {
            showAlert("Debes ingresar un saldo válido", "warning");
            return;
        }

        if (!form.Estado.value) {
            showAlert("Debes seleccionar el estado", "warning");
            return;
        }

        const formData = new FormData(form);

        fetch('/Cuenta/Insert', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    showAlert(data.message, "success");
                    form.reset();
                    inputIdCliente.value = "";
                    M.updateTextFields();
                    M.FormSelect.init(document.querySelectorAll('select'));
                } else {
                    showAlert(data.message, "danger");
                }
            })
            .catch(err => {
                console.error(err);
                showAlert("Error inesperado", "danger");
            });
    });
});
