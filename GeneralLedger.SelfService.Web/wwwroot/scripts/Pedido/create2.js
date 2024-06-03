var detallePedidoModel = [];
var listaArticulos = [];
var listaServicios = [];
var isIvaInc = true;
var Subtotal = 0, Iva = 0, Total = 0;

var pedidoModel =
{
    consecutivo: "",
    fecha: Date.now(),
    fechaRequerido: Date.now(),
    nombreCliente: "",
    nitCliente:"",
    codigoCliente: "",
    codigoEscala: "",
    codigoVendedor: "",
    tipoCliente: "",
    telefono: "",
    direccion: "",
    codigoPostal: "",
    codigoCiudad: "",
    codigoSucursal: "",
    detalle: "",
    subTotal: 0,
    valorIva: 0,
    total: 0,
    IvaIncluido: 0,
    detalles: detallePedidoModel,
}
 
$(document).ready(function ()
{    
    let tipoIva = $("#ivaIncluido").val();
    isIvaInc = (tipoIva == "1") ? true : false;


    let currentDate = new Date();
    $("#fechaRequerido").val(formatDate2(currentDate));

    $("#btn-save-pedido").click(function ()
    {
        if (ValidateForms("#form-pedido"))
        {
            SavePedido();
        }
    });

    $('#search-items').keypress(function (event)
    {
        if (event.which === 13)
        {
            event.preventDefault();  // Aquí puedes llamar a la función que deseas ejecutar al presionar "Enter"
            SearchItem($('#search-items').val());
        }
    });

    GetArticulos();
    GetServicios();
});

function GetArticulos()
{
    let codigoEscala = $("#codigoEscala").val();

    $.ajax({
        url: "/Pedido/GetArticulos",
        dataType: "json",
        data: {codigoEscala : codigoEscala},
        success: function (response)
        {
            listaArticulos = response.data;
            showArticulos(response.data);
        }
    });
}

function GetServicios()
{
    let codigoEscala = $("#codigoEscala").val();

    $.ajax({
        url: "/Pedido/GetServicios",
        dataType: "json",
        data: { codigoEscala: codigoEscala },
        success: function (response)
        {
            listaServicios = response.data;
            showServicios(response.data);
        }
    });
}

function showArticulos(list)
{
    var listContainer = document.querySelector('#articulosLayout');

    listContainer.innerHTML = "";
    $.each(list, function (index, item)
    {
        let htmliva = `<div class="d-flex gap-2">
                    <span class="m-0 fw-bold">Iva:</span>
                    <span class="text-gray-700 m-0">${item.iva}% ${((isIvaInc) ? "Incluido" : "No Incluido")}</span>
                   </div>`;

        var article = document.createElement('article');
        article.className = 'col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-3 p-0 flex';
        article.innerHTML = `
        <div class="card item-card mx-2 position-relative d-flex flex-column overflow-hidden h-100">
            <div class="d-flex flex-column flex-grow-1 p-3 text-black">
                <span class="font-weight-bold h6 text-truncate">${item.descripcion}</span>
                <div class="d-flex gap-2 mt-1">
                    <span class="m-0 fw-bold">Medida:</span>
                    <span class="text-gray-700 m-0">${item.medida}</span>
                </div>
                ${(item.iva > 0) ? htmliva : ""}
                <div class="d-flex justify-content-end mt-auto">
                    <span class="text-bold-600 m-0" style="font-size: 1.09375rem;">${formatterPeso.format(item.precio) }</span>
                    <button  type="button" class="btn btn-sm btn-success ms-auto" onclick="AddItemInv('${item.codigo}')">
                        <i class="fa fa-plus"></i>
                        <span>Agregar</span>
                    </button>
                </div>
            </div>
        </div>
    `;
        listContainer.appendChild(article);
    });
}

function showServicios(list) {
    var articulosContainer = document.querySelector('#serviciosLayout');

    articulosContainer.innerHTML = "";

    $.each(list, function (index, item)
    {
        let htmliva = `<div class="d-flex gap-2">
                        <span class="m-0 fw-bold">Iva:</span>
                        <span class="text-gray-700 m-0">${item.iva}% ${((isIvaInc) ? "Incluido" : "No Incluido")}</span>
                       </div>`;

        var article = document.createElement('article');
        article.className = 'col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-3 p-0 flex';
        article.innerHTML = `
        <div class="card item-card mx-2 position-relative d-flex flex-column overflow-hidden h-100">
            <div class="d-flex flex-column flex-grow-1 p-3 text-black">
                <span class="font-weight-bold h6 mb-0">${item.servicio}</span>
                <div class="d-flex mt-0 pt-0">
                    <div class="m-0 text-gray-700 text-truncate" style="max-width: 350px;max-height:30px;">${item.descripcion}</div>
                </div>
                <div class="d-flex gap-2 mt-2">
                    <span class="m-0 fw-bold">Medida:</span>
                    <span class="text-gray-700 m-0">${item.medida}</span>
                </div>
                ${(item.iva > 0) ? htmliva :""}
                <div class="d-flex justify-content-end mt-auto">
                <span class="fw-bold-600 m-0" style="font-size: 1.09375rem;">${formatterPeso.format(item.precio)}</span>
                    <button type="button" class="btn btn-sm btn-success ms-auto" onclick="AddItemSer('${item.codigo}')">
                        <i class="fa fa-plus"></i>
                        <span>Agregar</span>
                    </button>
                </div>
            </div>
        </div>
    `;
        articulosContainer.appendChild(article);
    });
}

function AddItemInv(item)
{
    var existeArticulo = detallePedidoModel.some(x => x.codigo == item)

    if (existeArticulo)
    {
        ToastAlert.fire({ icon: 'warning', title: "¡El ítem seleccionado ya ha sido agregado!" });
        retun;
    }

    var articulo = listaArticulos.find(x => x.codigo == item);

    if (articulo == null)
    {
        ToastAlert.fire({ icon: 'error', title: "¡El ítem seleccionado no existe!" });
        retun;
    }

    var newArticulo =
    {
        codigo: articulo.codigo,
        cantidad: 1,
        detalle: articulo.descripcion,
        medida: articulo.medida,
        vlrUni: articulo.precio,
        tipoMov: "INV",
        tecnico: "",
        iva: articulo.iva,
        costo: (articulo.costo == "" || articulo.costo == null) ? "0" : articulo.costo,
        dependencia: "",
        escala: articulo.escala,
        porDescuento: 0,
        tercero: "",
        valorIva: (isIvaInc) ? ((articulo.precio) * (articulo.iva / (articulo.iva + 100))) : (articulo.iva * (articulo.precio / 100)),
        subtotal: (isIvaInc) ? (articulo.precio - (articulo.precio) * (articulo.iva / (articulo.iva + 100))) : (articulo.precio),
        cco: "",
        NumDoc: "",
        tipodoc_ped: ""
    };

    detallePedidoModel.push(newArticulo);

    ToastAlert.fire({ icon: 'success', title: articulo.descripcion + " ha sido agregado al pedido." });

    LoadItemsPedido();
}

function AddItemSer(item)
{
    var existeServicio = detallePedidoModel.some(x => x.codigo == item)

    if (existeServicio)
    {
        ToastAlert.fire({ icon: 'warning', title: "¡El ítem seleccionado ya ha sido agregado!" });
        retun;
    }

    var servicio = listaServicios.find(elemento => elemento.codigo == item);

    if (servicio == null)
    {
        ToastAlert.fire({ icon: 'error', title: "¡El ítem seleccionado no existe!" });
        retun;
    }

    var newServicio = {
        codigo: servicio.codigo,
        cantidad: 1,
        detalle: servicio.servicio,
        medida: servicio.medida,
        vlrUni: servicio.precio,
        tipoMov: "SER",
        tecnico: "",
        iva: servicio.iva,
        costo: (servicio.costo == "" || servicio.costo == null) ? "0" : servicio,
        dependencia: "",
        escala: servicio.escala,
        porDescuento: 0,
        tercero: 0,
        valorIva: (isIvaInc) ? ((servicio.precio) * (servicio.iva / (servicio.iva + 100))) : (servicio.iva * (servicio.precio / 100)),
        subtotal: (isIvaInc) ? (servicio.precio - (servicio.precio) * (servicio.iva / (servicio.iva + 100))) : (servicio.precio),
        cco: "",
        NumDoc: "",
        tipodoc_ped: ""
    };

    detallePedidoModel.push(newServicio);

    ToastAlert.fire({ icon: 'success', title: servicio.servicio + " ha sido agregado al pedido." });

    LoadItemsPedido();
}

function LoadItemsPedido()
{
    var listContainer = document.querySelector('#container-items');
    listContainer.innerHTML = "";

    Subtotal = 0; Iva = 0; Total = 0;

    $.each(detallePedidoModel, function (detallePedidoModel, item)
    {
        Subtotal = Subtotal + item.subtotal;
        Iva = Iva + item.valorIva;

        let textoIva = (item.iva > 0) ? ((isIvaInc) ? "(Iva Incluido)" : "(Iva No Incluido)") : "";

        var article = document.createElement('article');
        article.className = 'border-top px-3 py-4 d-flex';
        article.innerHTML = `
                <div class="d-flex flex-grow-1">
                    <div class="flex-1">
                        <span class="h6 mb-1">${item.detalle}</span></br>
                        <span class="small">${formatterPeso.format(item.vlrUni)} ${textoIva}</span>
                        <div class="d-flex mt-2">
                            <button type="button" class="btn btn-secondary btn-sm" onclick="MinusValue('${item.codigo}','${item.tipoMov}')">
                                <i class="fa fa-minus"></i>
                            </button>
                            <input type="text"
                                    class="form-control w-50px form-control-sm mx-2 bg-white bg-opacity-25 bg-white bg-opacity-25 text-center"
                                    value="${item.cantidad}">
                            <button type="button" class="btn btn-secondary btn-sm" onclick="PlusValue('${item.codigo}','${item.tipoMov}')">
                                <i class="fa fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="ms-3 d-flex flex-column">
                    <div class="flex-1 fw-bold-600" style="font-size: 1rem;">${formatterPeso.format(item.vlrUni * item.cantidad)}</div>
                    <div class="text-end">
                        <button type="button" class="btn btn-default btn-sm text-danger border-danger" type="button" onclick="RemoveItem('${item.codigo}','${item.tipoMov}')">
                            <i class="fa fa-trash"></i>
                        </button>
                    </div>
                </div>
    `;
        listContainer.appendChild(article);
    });

    Total = Subtotal + Iva;

    $("#subtotal-ped").text(formatterPeso.format(Subtotal));
    $("#iva-ped").text(formatterPeso.format(Iva));
    $("#total-ped").text(formatterPeso.format(Total));
}

function SearchItem(search)
{
    let itemsFilteredArt = [];
    let itemsFilteredSer = [];

    if (search == null || search == '')
    {
        itemsFilteredArt = listaArticulos;
        itemsFilteredSer = listaServicios;
    }
    else
    {
        listaArticulos.forEach(function (item)
        {
            if (item.descripcion.toLowerCase().includes(search.toLowerCase()))
            {           
                itemsFilteredArt.push(item);
            }
        });

        listaServicios.forEach(function (item)
        {
            if (item.servicio.toLowerCase().includes(search.toLowerCase())) {
                itemsFilteredSer.push(item);
            }
        });
    }

    showArticulos(itemsFilteredArt);
    showServicios(itemsFilteredSer);
}

function RemoveItem(codigo, tipo)
{
    let existeArticulo = detallePedidoModel.some(x => x.codigo == codigo && x.tipoMov == tipo);

    if (!existeArticulo)
    {
        ToastAlert.fire({ icon: 'success', title: "¡El ítem seleccionado no existe!" });
        return;
    }


    let itemsNoDelete = [];

    detallePedidoModel.forEach(function (item)
    {
        if (item.codigo == codigo && item.tipoMov == tipo)
        {
            
        } else
        {
            itemsNoDelete.push(item);
        }
    });

    detallePedidoModel = itemsNoDelete;

    LoadItemsPedido();
}

function MinusValue(codigo,tipo)
{
    let detalleEdit = [];
    detallePedidoModel.forEach(function (item)
    {
        if (item.codigo == codigo && item.tipoMov == tipo)
        {
            if ((item.cantidad - 1) <= 0)
            {
                item.cantidad = 1;
            } else {
                item.cantidad = item.cantidad - 1;
            }

            item.valorIva = (isIvaInc) ? ((item.vlrUni * item.cantidad) * (item.iva / (item.iva + 100))) : ((item.vlrUni * item.cantidad) * (item.iva / 100));
            item.subtotal = (isIvaInc) ? ((item.vlrUni * item.cantidad) - ((item.vlrUni * item.cantidad) * (item.iva / (item.iva + 100)))) : (item.vlrUni * item.cantidad);
        }

        detalleEdit.push(item);
    });

    detallePedidoModel = detalleEdit;

    console.log(detallePedidoModel);

    LoadItemsPedido();
}

function PlusValue(codigo,tipo)
{
    let detalleEdit = [];

    detallePedidoModel.forEach(function (item)
    {
        if (item.codigo == codigo && item.tipoMov == tipo)
        {
            item.cantidad = item.cantidad + 1;
        }   

        item.valorIva = (isIvaInc) ? ((item.vlrUni * item.cantidad) * (item.iva / (item.iva + 100))) : ((item.vlrUni * item.cantidad) * (item.iva/100));
        item.subtotal = (isIvaInc) ? ((item.vlrUni * item.cantidad) - ((item.vlrUni * item.cantidad) * (item.iva / (item.iva + 100)))) : (item.vlrUni * item.cantidad);

        detalleEdit.push(item);
    });

    detallePedidoModel = detalleEdit;

    LoadItemsPedido();
}

function SavePedido()
{
    if (detallePedidoModel.length <= 0)
    {
        ToastAlert.fire({ icon: 'warning', title: "¡No hay ítems en el pedido!" });
        return true;
    }

    let cantidadCero = detallePedidoModel.some(x => x.cantidad == 0);

    if (cantidadCero)
    {
        ToastAlert.fire({ icon: 'warning', title: "¡Existen ítem con cantidad en cero, por favor verificar!" });
        return true;
    }

    var PedidoCreateDTO =
    {
        consecutivo: "",
        fecha: Date.now(),
        fechaRequerido: $("#fechaRequerido").val(),
        nombreCliente: $("#nombreCliente").val(),
        nitCliente: $("#nitCliente").val(),
        codigoCliente: $("#codigoCliente").val(),
        codigoSolicitante: $('#codigoSolicitante').val(),
        codigoEscala: $("#codigoEscala").val(),
        codigoVendedor: $("#codigoVendedor").val(),
        tipoCliente: $("#tipoCliente").val(),
        telefono: $("#telefono").val(),
        direccion: $("#direccion").val(),
        codigoPostal: $("#codigoPostal").val(),
        codigoCiudad: $("#codigoCiudad").val(),
        codigoSucursal: $('#codigoSucursal').val(),
        detalle: $("#detalle").val(),
        subTotal: Subtotal,
        valorIva: Iva,
        total: Total,
        IvaIncluido: (isIvaInc) ? 1 : 0,
        detalles: detallePedidoModel,
    }

    $.ajax({
        url: "/Pedido/Create",
        type: "POST",
        data: { pedido: PedidoCreateDTO },
        beforeSend: function () {
            LoaderScreenShow();
            $('#btn-save-pedido').prop('disabled', true);
        },
        success: function (response)
        {
            if (response.result)
            {
                window.location.href = response.redirect;
            } else {
                ToastAlert.fire({ icon: 'error', title: "Error" });
            }
        },
        complete: function ()
        {
            LoaderScreenHide();
            $('#btn-save-pedido').prop('disabled', false);
        }
    });
}
