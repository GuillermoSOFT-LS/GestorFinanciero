document.addEventListener('DOMContentLoaded', function () {
    // Inicializar Materialize
    M.Modal.init(document.querySelectorAll('.modal'));
    M.FormSelect.init(document.querySelectorAll('select'));

    // Elementos
    const btnBuscar = document.getElementById("btnBuscarCliente");
    const inputDocumento = document.getElementById("DocumentoBuscar");
    const inputNombre = document.getElementById("NombreInsert");
    const inputIdCliente = document.getElementById("IdClienteInsert");
    const form = document.getElementById("formInsertCliente");

    // Buscar cliente
    btnBuscar.addEventListener("click", function () {
        const documento = inputDocumento.value.trim();

        if (!documento) {
            showAlert("Debes ingresar un documento", "warning");
            return;
        }

        fetch('/Cuenta/SelectClientDocument?documento=' + encodeURIComponent(documento))
            .then(response => response.json())
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
                console.error(err);
                showAlert("Error al buscar cliente", "danger");
            });
    });

    // Enviar formulario
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Validaciones
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

        // Enviar form data directamente
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
