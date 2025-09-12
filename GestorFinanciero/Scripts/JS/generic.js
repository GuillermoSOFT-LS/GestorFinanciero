function Pintar(objConfiguration, objBusqueda) {

    fetch(objConfiguration.url)
        .then(res => res.json())
        .then(data => {
            //Busqueda
            const SeccionBusqueda = (objBusqueda != undefined && objBusqueda.Buscar === true) ?
                `<div class="input-group mb-3" >
                    <input type="text" class="form-control" id="${objBusqueda.inputText}" placeholder="${objBusqueda.placeolder}">
                        <button class="btn btn-primary" type="button" id="${objBusqueda.btnId}">Buscar</button>
                </div>`: '';

            // Cabecera de la tabla
            const cabecera = objConfiguration.cabeceras
                .map(th => `<th>${th}</th>`)
                .join('');

            // Filas de la tabla
            const filas = data
                .map(fila => {
                    const celdas = objConfiguration.Datos
                        .map(col => {
                            const valor = fila[col];
                            if (col === 'Estado') {
                                return `<td>${valor === true
                                    ? '<span class=" blue darken-1 white-text Bage">Activo</span>'
                                    : '<span class="red darken-4 white-text Bage">Inactivo</span>'
                                    }</td>`;
                            }

                            if (col === 'FechaRegistro' && valor) {
                                // Extraer número del formato /Date(xxxxx)/
                                const timestamp = parseInt(valor.replace(/\/Date\((\d+)\)\//, "$1"));
                                const fecha = new Date(timestamp);

                                // Formatear a dd/MM/yyyy
                                const fechaFormateada = fecha.toLocaleDateString("es-ES", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric"
                                });

                                return `<td>${fechaFormateada}</td>`;
                            }



                            return `<td>${valor}</td>`;
                        })
                        .join('');

                    const acciones = `
                        <td class='accionesTabla'>
                          <button class="Badges" data-target="modalCliente"><i class="material-icons blue-text text-darken-2" style="cursor:pointer">border_color</i></button>
                          <button class="Badges"><i class="material-icons red-text text-darken-2" style="cursor:pointer">delete_forever</i></button>
                        </td>`;

                    return `<tr>${celdas}${acciones}</tr>`;
                })
                .join('');

            // Tabla completa
            const tabla = `
            ${SeccionBusqueda}
                <table class="highlight responsive-table tableHead">
                    <thead class="blue white-text tableHead">
                        <tr>${cabecera} <th>Acciones</th></tr>
                    </thead>
                    <tbody class="white black-text">
                        ${filas}
                        
                    </tbody>
                </table>`;

            document.getElementById(objConfiguration.Id).innerHTML = tabla;
        });
}

