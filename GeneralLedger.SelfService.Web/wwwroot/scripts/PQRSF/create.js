const dragArea = document.querySelector('.drag-area');
const button = dragArea.querySelector('button');
const inputFile = dragArea.querySelector('#Archivo');

$(document).ready(function ()
{
    let currentDate = new Date();
    $("#Fecha").val(formatDate2(currentDate));

    $('#Descripcion').summernote({
        height: 280,
        minHeight: 280,
        maxHeight: 280,
        lang: 'es-ES',
        placeholder: 'Describe aqui la situacion...',
        toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'underline', 'clear']],
            ['fontname', ['fontname']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['table', ['table']],
            ['view', ['fullscreen', 'codeview', 'help']]
        ],
        callbacks: {
            onImageUpload: function (files) {
                var formData = new FormData();
                formData.append('file', files[0]);

                $.ajax({
                    url: '/PQRSF/UploadImageSummerNote', // Ruta del controlador en ASP.NET Core
                    method: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (response) {
                        var imageUrl = response.filePath;
                        var image = $('<img>').attr('src', '/Temp/Trash' + imageUrl);
                        console.log(image);
                        $('#Descripcion').summernote('insertNode', image[0]);
                    },
                    error: function (xhr, status, error) {
                        console.error(xhr.responseText);
                    }
                });
            }
        }
    });

    $("#btn-contacto").on("click", () => {
        $("#modal-contacto").show();
    });

    $("#btn-save-contacto").on("click", (e) => {
        SaveNewContacto();
    });

    $("#btn-create-pqrsf").on("click", () =>
    {
        if (!ValidateForms("#form-create-pqrsf"))
        {
            return;
        }

        SavePQRSF();
    });

    LoadPerfiles();
});


function LoadPerfiles()
{

    $.ajax({
        url: '/PQRSF/GetPerfilesPQRSF',
        type: "GET",
        datatype: "json",
        success: function (response)
        {
            if (response.result) {

                $("#IdContacto").empty();
                $("#IdSituacion").empty();

                $('#IdContacto').append($('<option>',
                {
                    value: "",
                    text: "Seleccione..."
                }));

                $('#IdSituacion').append($('<option>',
                {
                    value: "",
                    text: "Seleccione..."
                }));


                $.each(response.data.contactos, function (index, opcion) {
                    $('#IdContacto').append($('<option>',
                    {
                        value: opcion.codigo,
                        text: (`${opcion.celular}-${opcion.nombreContacto}`)
                    }));
                });

                $.each(response.data.situaciones, function (index, opcion) {
                    $('#IdSituacion').append($('<option>',
                    {
                        value: opcion.codigo,
                        text: opcion.tipoSituacion
                    }));
                });

            } else {
                toastr.error(response.message, "Ups! Ha ocurrido un error!");
            }
        }
    });
}

function SaveNewContacto()
{
    let form = $('#form-contacto');

    if ($("#form-contacto").valid()) {
        $.ajax({
            url: '/Contacto/SaveNewContacto',
            type: "POST",
            data: form.serialize(),
            beforeSend: function () {
                LoaderScreenShow();
                $('#btn-save-contacto').prop('disabled', true);
            },
            success: function (response) {
                if (response.result) {
                    ToastAlert.fire({ icon: 'success', title: response.message });
                    LoadContactos();
                    $("#modal-contacto #btn-close-modal").click();
                    $("#NombreContacto").val("");
                    $("#Celular").val("");
                    $("#Telefono").val("");
                    $("#Email").val("");
                    $(`#IdContacto option[value="${response.contacto}"]`).attr("selected", "selected");
                } else {
                    ToastAlert.fire({ icon: 'error', title: response.message });
                }
            },
            complete: function () {
                LoaderScreenHide();
                $('#btn-save-contacto').prop('disabled', true);
            }
        });
    }
}

function SavePQRSF()
{
    var formData = new FormData($("#form-create-pqrsf")[0]);


    $.ajax({
        url: "/PQRSF/Create",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        beforeSend: function () {
            LoaderScreenShow();
            $('#btn-create-pqrsf').prop('disabled', true);
            $('#btn-cancel-pqrsf').prop('disabled', true);
        },
        success: function (response) {
            if (response.result) {
                LoadEmpresas();
                modalEmpresa.hide();
            } else {
                ToastAlert.fire({ icon: 'error', title: "Error" + response.msg });
            }
        },
        complete: function () {
            LoaderScreenHide();
            $('#btn-create-pqrsf').prop('disabled', false);
            $('#btn-cancel-pqrsf').prop('disabled', false);
        }
    });
}