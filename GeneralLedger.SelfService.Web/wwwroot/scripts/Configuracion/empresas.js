var modalEmpresa = new bootstrap.Modal(document.getElementById("modal-empresa"), {});
var modalGrupoEmpresa = new bootstrap.Modal(document.getElementById("modal-grupo-empresa"), {});

$(document).ready(function ()
{
    LoadEmpresas();


    $("#btn-new-empresa").click(function ()
    {
        LoadGruposEmpresas();
        modalEmpresa.show();
    });

    $("#btn-grupo").click(function ()
    {
        modalGrupoEmpresa.show();
    });

    $("#btn-save-empresa").click(function () {
        SaveEmpresa()
    });

});

function LoadEmpresas()
{
    $.ajax({
        url: "/Configuration/GetEmpresas",
        type: "GET",
        dataType: "json",
        beforeSend: function () {
            LoaderScreenShow();
        },
        success: function (response) {
            tablePedidos = $("#table-empresas").DataTable({
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
                        "data": "nit",
                        render: function (data, type, row) {

                            return ` ${data}-${row.div}`;

                        }
                    },
                    {
                        "data": "nombre",
                        render: function (data, type, row) {

                            return `${data}`;
                        }
                    },
                    {
                        "data": "emailPrincipal",
                        render: function (data, type, row) {

                            return `${data}`;
                        }
                    },
                    {
                        "data": "ip",
                        render: function (data, type, row) {

                            return `${data}`;
                        }
                    },
                    {
                        "data": "db",
                        render: function (data, type, row) {

                            return `${data}`;
                        }
                    },
                    {
                        "data": "fechaRegistro",
                        render: function (data, type, row) {

                            return `<div class="text-center">
                                        <span class="badge bg-success bg-opacity-20 text-success fw-bold text-center" style="font-size:0.8rem">
                                            <i class="far fa-calendar-plus fa-lg"></i>
                                            ${formatDate(new Date(data))}
                                        </span>
                                    </div>`;
                        }
                    },
                    {
                        "data": "id",
                        render: function (data, type, row) {

                            return `<div class="text-end">
                                        <button type="button" class="btn btn-secondary" onclick="OpenModalDataSheet('${data}')"><i class="fas fa-eye"></i></button>
                                        <button type="button" onclick="" ${(row.estado == 'A') ? 'class="btn btn-success check-btn"' : 'class="btn btn-danger check-btn"'}> ${(row.estado == 'A') ? 'Activo' : 'Inactivo'}</button>
                                    </div>
                                    `;
                        }
                    },
                ],
                columnDefs: [
                    { "width": "10%", "targets": 0 },
                    { "width": "30%", "targets": 1 },
                    { "width": "10%", "targets": 2 },
                    { "width": "10%", "targets": 3 },
                    { "width": "10%", "targets": 4 },
                    { "width": "10%", "targets": 5 },
                    { "width": "20%", "targets": 6 },
                ],
            });
        },
        complete: function () {
            LoaderScreenHide();
        }
    });
}

function LoadGruposEmpresas()
{
    $.ajax({
        url: "/Configuration/GetGrupoEmpresa",
        type: "GET",
        success: function (response)
        {
            if (response.result)
            {

                $('#GrupoEmpresa').empty();

                $('#GrupoEmpresa').append($('<option>',
                {
                    value: "",
                    text: "Seleccione una opción"
                }));


                $.each(response.data, function (index, opcion) {
                    $('#GrupoEmpresa').append($('<option>',
                    {
                        value: opcion.id,
                        text: opcion.nombre
                    }));
                });

            } else {
                ToastAlert.fire({ icon: 'error', title: "Error" });
            }
        },
    });
}

function SaveEmpresa()
{

    if (!ValidateForms("#form-empresa"))
    {
        return;
    }

    let modelEmpresa =
    {
        id: 0,
        nit: $("#nitEmpresa").val(),
        div: 0,
        nombre: $("#nombreEmpresa").val(),
        codigoLegacy: "",
        emailPrincipal: $("#correoPrincipal").val(),
        estado: "",
        ip: $("#ipServidor").val(),
        db: $("#baseDatos").val(),
        keyConnection: $("#keyConnection").val(),
        urlWeb: $("#linkWebEmpresa").val(),
        logo: "",
        fileLogo: $("#logoEmpresa").val(),
        salt: "",
        fechaRegistro: "",
        userDB: $("#usuarioBaseDatos").val(),
        passwordUserDB: $("#password").val()
    };

    var formData = new FormData($("#form-empresa")[0]);


    $.ajax({
        url: "/Configuration/SaveEmpresa",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        beforeSend: function () {
            LoaderScreenShow();
            $('#btn-save-empresa').prop('disabled', true);
        },
        success: function (response) {
            if (response.result)
            {
                LoadEmpresas();
                modalEmpresa.hide();
            } else {
                ToastAlert.fire({ icon: 'error', title: "Error" + response.msg });
            }
        },
        complete: function () {
            LoaderScreenHide();
            $('#btn-save-empresa').prop('disabled', false);
        }
    });
}