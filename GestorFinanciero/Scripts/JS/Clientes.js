// Scripts/JS/Clientes.js

// Inicializaciones de Materialize
document.addEventListener('DOMContentLoaded', function () {
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var selects = document.querySelectorAll('select');
    M.FormSelect.init(selects);
});

// ---------------------------------------------------
// FILTRADO COMBINADO (input + select)
// ---------------------------------------------------
(function () {
    const searchInput = document.getElementById('search');
    const filtroSelect = document.getElementById('Filtro');
    const tablaBody = document.getElementById('clientesBody');

    if (!searchInput || !filtroSelect || !tablaBody) return;

    // Debounce helper
    function debounce(fn, delay) {
        let t;
        return function (...args) {
            clearTimeout(t);
            t = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    function filterTable() {
        const query = (searchInput.value || '').trim().toLowerCase();
        const estadoFilter = filtroSelect.value; // "2"=Todos, "1"=Activo, "0"=Inactivo

        const rows = tablaBody.querySelectorAll('tr');
        let visibleCount = 0;

        rows.forEach(row => {
            if (row.classList.contains('no-results')) return;

            const rowText = row.textContent.replace(/\s+/g, ' ').toLowerCase();
            const estadoCell = row.querySelector('td:nth-child(6)');
            let estado = '';
            if (estadoCell) {
                estado = estadoCell.textContent.toLowerCase();
            }

            // Filtro por texto
            const matchText = query === '' || rowText.indexOf(query) !== -1;

            // Filtro por estado
            let matchEstado = true;
            if (estadoFilter === "1") {
                matchEstado = estado.trim() === "activo";
            } else if (estadoFilter === "0") {
                matchEstado = estado.trim() === "inactivo";
            }


            const match = matchText && matchEstado;
            row.style.display = match ? '' : 'none';
            if (match) visibleCount++;
        });

        // Mostrar fila "no resultados"
        let noRow = tablaBody.querySelector('.no-results');
        if (!noRow) {
            noRow = document.createElement('tr');
            noRow.className = 'no-results';
            noRow.innerHTML = `<td colspan="8" class="center-align">No se encontraron clientes.</td>`;
        }

        if (visibleCount === 0) {
            if (!tablaBody.contains(noRow)) tablaBody.appendChild(noRow);
        } else {
            if (tablaBody.contains(noRow)) tablaBody.removeChild(noRow);
        }
    }

    // Eventos
    const debouncedFilter = debounce(filterTable, 200);
    searchInput.addEventListener('input', debouncedFilter);
    filtroSelect.addEventListener('change', filterTable);

    // Aplicar filtro inicial
    filterTable();
})();

function cargarCliente(id) {
    fetch(URLGetClientById + "?id=" + id)
        .then(res => res.json())
        .then(cliente => {
            if (cliente) {
                document.getElementById("editIdCliente").value = cliente.IdCliente;
                document.getElementById("NombreEdit").value = cliente.Nombre || '';
                document.getElementById("DocumentoEdit").value = cliente.Documento || '';
                document.getElementById("CorreoEdit").value = cliente.Correo || '';
                document.getElementById("TelefonoEdit").value = cliente.Telefono || '';
                document.getElementById("EstadoEdit").value = cliente.Estado ? "1" : "0";

                if (M && M.updateTextFields) M.updateTextFields();
                M.FormSelect.init(document.querySelectorAll('select'));
            } else {
                console.warn("Cliente no encontrado.");
            }
        })
        .catch(err => console.error("Error cargando cliente:", err));
}
