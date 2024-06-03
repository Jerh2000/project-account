var modalPedido = new bootstrap.Modal(document.getElementById("modal-show-pedido"), {});

$(document).ready(function ()
{
    let currentDate = new Date();
    let firstDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    $("#fechaI").val(formatDate2(firstDate));
    $("#fechaF").val(formatDate2(currentDate));

    LoadTablePedidos();

    $("#btn-open-pedido").on('click', () => { OpenModal("modal-tracking-pedido"); });

    $("#btnBuscar").click(function ()
    {
        LoadTablePedidos();
    });


    const ShowMessage = function (message) {
        if (message != "" && message != null && message != undefined) {
            ToastAlert.fire({
                icon: 'success',
                title: message
            });
        }
    }
});

function LoadTablePedidos()
{
   
    $.ajax({
        url: "/Pedido/GetPedidos",
        type: "GET",
        data: {
            FechaI: function () { return $('#fechaI').val() },
            FechaF: function () { return $('#fechaF').val() },
        },
        dataType: "json",
        beforeSend: function () {
            LoaderScreenShow();
        },
        success: function (response)
        {
            tablePedidos = $("#table-pedidos").DataTable({
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
                        "data": "numeroPedido",
                        render: function (data, type, row) {

                            return `
                        
                                    <div class="list-group list-group-flush bg-transparent">
                                        <div class="list-group-item d-flex px-0 bg-transparent">
                                            <div class="flex-fill">
                                                <div class="d-flex justify-content-center align-items-center">
                                                    <div class="my-0 py-0">
                                                        <span class="badge bg-info fw-bold" style="font-size:0.7rem"># ${data}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                `;

                        }
                    },
                    {
                        "data": "fecha",
                        render: function (data, type, row) {

                            return `
                                <div class="list-group list-group-flush bg-transparent">
                                    <div class="list-group-item d-flex px-0 py-1 my-1 bg-transparent">
                                        <div class="flex-fill">
                                            <span class="badge bg-success bg-opacity-20 text-success fw-bold" style="font-size:0.7rem"> 
                                                <i class="far fa-calendar-plus fa-lg"></i>
                                                ${formatDate(new Date(data))}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }
                    },
                    //{
                    //    "data": "fechaRequerido",
                    //    render: function (data, type, row) {

                    //        return `
                    //            <div class="list-group list-group-flush bg-transparent">
                    //                <div class="list-group-item d-flex px-0 py-1 my-1 bg-transparent">
                    //                    <div class="flex-fill">
                    //                        <span class="badge bg-success bg-opacity-20 text-success fw-bold" style="font-size:0.7rem"> 
                    //                            <i class="far fa-calendar-plus fa-lg"></i>
                    //                            ${formatDate(new Date(data))}
                    //                        </span>
                    //                    </div>
                    //                </div>
                    //            </div>
                    //        `;
                    //    }
                    //},
                    {
                        "data": "cliente",
                        render: function (data, type, row) {

                            return `${data}`;
                        }
                    },
                    {
                        "data": "direccion",
                        render: function (data, type, row) {

                            return `${data}`;
                        }
                    },
                    {
                        "data": "estado",
                        render: function (data, type, row) {

                            return `${data}`;
                        }
                    },
                    {
                        "data": "subTotal",
                        render: function (data, type, row) {

                            return `<b>${formatterPeso.format(data)}</b>`;
                        }
                    },
                    {
                        "data": "valorIva",
                        render: function (data, type, row) {

                            return `<b>${formatterPeso.format(data)}</b>`;
                        }
                    },
                    {
                        "data": "total",
                        render: function (data, type, row) {

                            return `<b>${formatterPeso.format(data)}</b>`;
                        }
                    },
                    {
                        data: "numeroPedido",
                        render: function (data, type, row) {
                            return `<button type="button" class="input-group-text btn-secondary" onclick="OpenModalPedido('${data}')">
                                <i class="fas fa-eye"></i>
                            </button>`
                        }
                    }
                ],
                columnDefs: [
                    { "width": "5%", "targets": 0 },   
                    { "width": "5%", "targets": 1 },   
/*                    { "width": "5%", "targets": 2 },  */ 
                    { "width": "17%", "targets": 2 },   
                    { "width": "17%", "targets": 3 },   
                    { "width": "8%", "targets": 4},   
                    { "width": "10%", "targets": 5 },   
                    { "width": "10%", "targets": 6 },   
                    { "width": "10%", "targets": 7 },   
                    { "width": "8%", "targets": 8},   
                ],
            });
        },
        complete: function () {
            LoaderScreenHide();
        }
    });

}


function OpenModalPedido(codigoPedido)
{
    if (codigoPedido == null || codigoPedido == "")
    {
        return;
    }


    $.ajax({
        url: "/Pedido/GetPedidoCliente",
        type: "GET",
        data: { codigoPedido: codigoPedido },
        beforeSend: function ()
        {
            LoaderScreenShow();
        },
        success: function (response)
        {
            if (response.result)
            {
                let colorState = "";

                switch (response.data.cabecera.estado)
                {
                    case "PENDIENTE":
                        colorState = "badge bg-orange bg-opacity-20 text-orange px-2 pt-5px pb-5px rounded fs-12px";
                        break;
                    case "AUTORIZADO":
                        colorState = "badge bg-teal text-teal-800 bg-opacity-25 px-2 pt-5px pb-5px rounded fs-12px";
                        break;
                    case "NO AUTORIZADO":
                        colorState = "badge bg-gray-100 text-black text-opacity-50 px-2 pt-5px pb-5px rounded fs-12px";
                        break;
                    case "FACTURADO":
                        colorState = "badge bg-primary bg-opacity-20 text-primary px-2 pt-5px pb-5px rounded fs-12px";
                        break;
                    case "REMISIONADO":
                        colorState = "badge bg-yellow bg-opacity-50 text-black text-opacity-50 px-2 pt-5px pb-5px rounded fs-12px";
                        break;
                    case "GENERADO":
                        colorState = "badge bg-teal text-teal-800 bg-opacity-25 px-2 pt-5px pb-5px rounded fs-12px";
                        break;
                    default:
                        colorState = "";
                }


                $("#title-pedido").text("Detalle de Pedido #" + response.data.cabecera.numeroPedido);
                $("#fechaPedido").html(`<i class="far fa-calendar-plus fa-lg"></i> ${formatDate(new Date(response.data.cabecera.fecha))}`);
                //$("#fechaPedido").text(formatDate(new Date(response.data.cabecera.fecha)));
                $("#clientePedido").text(response.data.cabecera.cliente);
                $("#direccionPedido").text(response.data.cabecera.direccion);
                $("#solicitantePedido").text(response.data.cabecera.solicitante);
                $("#estadoPedido").html(`<i class="fa fa-circle text-teal fs-9px fa-fw me-5px"></i> ${response.data.cabecera.estado}`);
                //$("#estadoPedido").text(response.data.cabecera.estado);
                $("#estadoPedido").addClass(colorState);
                $("#subtotalPedido").text(formatterPeso.format(response.data.cabecera.subTotal));
                $("#ivaPedido").text(formatterPeso.format(response.data.cabecera.valorIva));
                $("#totalPedido").text(formatterPeso.format(response.data.cabecera.total));
                $("#observacionesPedido").text(response.data.cabecera.descripcion);

                tableDetallePedidos = $("#table-detalle-pedidos").DataTable({
                    dom: "t<'d-flex align-items-center'<'me-auto pb-2 mx-2'i><'mb-0 pb-2 mx-2'p>>",
                    responsive: true,
                    scrollCollapse: true,
                    destroy: true,
                    paging: true,
                    lengthMenu: [15, 25, 50, 100],
                    language: {
                        url: "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json",
                    },
                    data: response.data.detalle,
                    "columns": [
                        {
                            "data": "codigoArticulo",
                            render: function (data, type, row) {

                                return `${data} - ${row.descripcionArticulo}`;

                            }
                        },
                        {
                            "data": "cantidadArticulo",
                            render: function (data, type, row)
                            {

                                return `${data}`;
                            }
                        },
                        {
                            "data": "ivaArticulo",
                            render: function (data, type, row) {

                                return `${data}%`;
                            }
                        },
                        {
                            "data": "valorUnitarioArticulo",
                            render: function (data, type, row) {

                                return `<b>${formatterPeso.format(data)}</b>`;
                            }
                        },
                        {
                            "data": "subtotal",
                            render: function (data, type, row) {

                                return `<b>${formatterPeso.format(data)}</b>`;
                            }
                        },
                        {
                            "data": "valorIva",
                            render: function (data, type, row) {

                                return `<b>${formatterPeso.format(data)}</b>`;
                            }
                        },
                        {
                            "data": "total",
                            render: function (data, type, row) {

                                return `<b>${formatterPeso.format(data)}</b>`;
                            }
                        },
                    ],
                    columnDefs: [
                        { "width": "30%", "targets": 0 },
                        { "width": "7%", "targets": 1 },
                        { "width": "5%", "targets": 2 },
                        { "width": "13%", "targets": 3 },
                        { "width": "15%", "targets": 4 },
                        { "width": "15%", "targets": 5 },
                        { "width": "15%", "targets": 5 },
                    ],
                });


                modalPedido.show();
            }
            else
            {
                ToastAlert.fire({ icon: 'error', title: "Error" });
            }
        },
        complete: function ()
        {
            LoaderScreenHide();
        }
    });
}

//function getPedidos(data) {
//    tablePedidos = $("#table-pedidos").DataTable({
//        responsive: true,
//        scrollCollapse: true,
//        destroy: true,
//        paging: true,
//        lengthMenu: [15, 25, 50, 100],
//        language: {
//            url: "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json",
//        },
//        data,
//        "columns": [
//            {
//                "data": "numeroPedido",
//                render: function (data, type, row) {

//                    return `
                        
//                        <div class="list-group list-group-flush bg-transparent">
//                            <div class="list-group-item d-flex px-0 bg-transparent">
//                                <div class="flex-fill">
//                                    <div class="d-flex justify-content-center align-items-center">
//                                        <div class="my-0 py-0">
//                                            <span class="badge bg-info fw-bold" style="font-size:0.7rem"># ${data}</span>
//                                        </div>
//                                    </div>
//                                </div>
//                            </div>
//                        </div>

//                    `;

//                }
//            },
//            {
//                "data": "fecha",
//                render: function (data, type, row) {

//                    return `
//                        <div class="list-group list-group-flush bg-transparent">
//                            <div class="list-group-item d-flex px-0 py-1 my-1 bg-transparent">
//                                <div class="flex-fill">
//                                    <span class="badge bg-success bg-opacity-20 text-success fw-bold" style="font-size:0.7rem"> 
//                                        <i class="far fa-calendar-plus fa-lg"></i>
//                                        ${formatDate(new Date(data))}
//                                    </span>
//                                </div>
//                            </div>
//                        </div>
//                    `;
//                }
//            },
//            {
//                "data": "fechaRequerido",
//                render: function (data, type, row) {

//                    return `
//                        <div class="list-group list-group-flush bg-transparent">
//                            <div class="list-group-item d-flex px-0 py-1 my-1 bg-transparent">
//                                <div class="flex-fill">
//                                    <span class="badge bg-success bg-opacity-20 text-success fw-bold" style="font-size:0.7rem"> 
//                                        <i class="far fa-calendar-plus fa-lg"></i>
//                                        ${formatDate(new Date(data))}
//                                    </span>
//                                </div>
//                            </div>
//                        </div>
//                    `;
//                }
//            },
//            {
//                "data": "cliente",
//                render: function (data, type, row) {

//                    return `
//                        ${data}
//                    `;
//                }
//            },
//            {
//                "data": "direccion",
//                render: function (data, type, row) {

//                    return `
//                        ${data}
//                    `;
//                }
//            },
//            {
//                "data": "estado",
//                render: function (data, type, row) {

//                    return `
//                        ${data}
//                    `;
//                }
//            },
//            {
//                "data": "subTotal",
//                render: function (data, type, row) {

//                    return `<b>${formatterPeso.format(data)}</b>`;
//                }
//            },
//            {
//                "data": "valorIva",
//                render: function (data, type, row) {

//                    return `<b>${formatterPeso.format(data)}</b>`;
//                }
//            },
//            {
//                "data": "total",
//                render: function (data, type, row) {

//                    return `<b>${formatterPeso.format(data)}</b>`;
//                }
//            },
//            {
//                data: "numeroPedido",
//                render: function (data, type, row) {
//                    return `<button type="button" data-bs-toggle="modal" data-bs-target="#modal-tracking-pedido" id="btn-open-pedido" class="input-group-text btn-secondary">
//                                <i class="fas fa-eye"></i>
//                            </button>`
//                }
//            }
//        ]
//    })
//}