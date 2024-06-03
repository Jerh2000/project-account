$(document).ready(function ()
{
    let currentDate = new Date();
    let firstDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    $("#fechaI").val(formatDate2(firstDate));
    $("#fechaF").val(formatDate2(currentDate));

    $("#btnBuscar").click(function ()
    {
        LoadFacturas();
    });

    LoadFacturas();

});


function LoadFacturas()
{
    $.ajax({
        url: "/Cartera/GetFacturasCliente",
        type: "GET",
        data: {
            Estado: function () { return $("#estado-factura").val() },
            FechaInicial: function () { return $('#fechaI').val() },
            FechaFinal: function () { return $('#fechaF').val() },
            Search: function () { return $("#search-t").val() }
        },
        dataType: "json",
        beforeSend: function () {
            LoaderScreenShow();
        },
        success: function (response)
        {
            tableFacturas = $("#table-facturas").DataTable({
                dom: "t<'d-flex align-items-center'<'me-auto pb-2 mx-2'i><'mb-0 pb-2 mx-2'p>>",
                responsive: true,
                scrollCollapse: true,
                destroy: true,
                paging: true,
                lengthMenu: [15, 25, 50, 100],
                language: {
                    url: "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json",
                },
                data: response.data,
                "columns": [
                    {
                        "data": "diasVen",
                        render: function (data, type, row)
                        {
                            var color = (data <= 0) ? "text-white" : (data >= 1 && data <= 30) ? "text-success" : (data >= 31 && data <= 60) ? "text-yellow" : (data >= 61 && data <= 90) ? "text-warning" : "text-danger";
                            return `<div class="text-center"><i class="fas fa-flag text-center ${color}"></i></div>`;
                        }
                    },
                    {
                        "data": "documento",
                        render: function (data, type, row)
                        {
                            return `<div class="tex-center">
                                        <span class="text-center fw-bold fs-6">${data}</div>
                                    </div>`;
                        }
                    },
                    {
                        "data": "estadoFactura",
                        render: function (data, type, row)
                        {
                            return `<div class="text-center">
                                        <span class="text-center fw-bold fs-6">${data}</span>
                                    </div>
                                    `;
                        }
                    },
                    {
                        "data": "fecha",
                        render: function (data, type, row)
                        {
                            let fecha = new Date(data);
                            fecha = formatDate(fecha);
                            return `<div class="text-center">
                                        <span class="badge bg-success bg-opacity-20 text-success fw-bold text-center" style="font-size:0.8rem">
                                            <i class="far fa-calendar-plus fa-lg"></i>
                                            ${fecha}
                                        </span>
                                    </div>`;
                        }
                    },
                    {
                        "data": "vence",
                        render: function (data, type, row)
                        {
                            let fecha = new Date(data);
                            fecha = formatDate(fecha);
                            return `<div class="text-center">
                                        <span class="badge bg-success bg-opacity-20 text-success fw-bold text-center" style="font-size:0.8rem">
                                            <i class="far fa-calendar-plus fa-lg"></i>
                                            ${fecha}
                                        </span>
                                    </div>`;
                        }
                    },
                    {
                        "data": "diasVen",
                        render: function (data, type, row)
                        {
                            return `<div class="text-center">
                                        <span class="text-center fw-bold fs-6">${data}</span>
                                    </div>
                                    `;
                        }
                    },
                    {
                        "data": "valor",
                        render: function (data, type, row)
                        {
                            return `<div class="text-end">
                                        <span class="text-end fw-bold fs-6">${formatterPeso.format(data)}</span>
                                    </div>`;
                        }
                    },
                    {
                        "data": "saldo",
                        render: function (data, type, row) {
                            return `<div class="text-end">
                                        <span class="text-end fw-bold fs-6">${formatterPeso.format(data)}</span>
                                    </div>`;
                        }
                    },
                    {
                        "data": "documento",
                        render: function (data, type, row)
                        {
                            return `<div class="text-end">
                                        <button class="btn btn-secondary"><i class="fas fa-print"></i></button>
                                        <button type="button" class="btn btn-secondary" onclick="OpenModalDataSheet('${data}')"><i class="fas fa-eye"></i></button>
                                        <button class="btn btn-primary bg-color-pay-valida text-white"><i class="icon-pay-valida text-white"></i> PAGA ONLINE</button>
                                    </div>
                                    `;
                        }
                    },
                ],
                columnDefs: [
                    { "width": "5%", "targets": 0 },
                    { "width": "10%", "targets": 1 },
                    { "width": "10%", "targets": 2 },
                    { "width": "15%", "targets": 3 },
                    { "width": "10%", "targets": 4 },
                    { "width": "10%", "targets": 5 },
                    { "width": "10%", "targets": 6 },
                    { "width": "10%", "targets": 7 },
                    { "width": "20%", "targets": 8 },
                ],
            });

            let totalCartera = 0;
            let totalPendiente = 0;

            response.data.forEach(obj => {
                totalCartera += (obj.subTotal + obj.valorIva);
                totalPendiente = totalPendiente + (obj.saldo);
            });

            $("#totalcartera").text("$ " + totalPendiente.toLocaleString());
        },
        complete: function ()
        {
            LoaderScreenHide();
        }
    });
}