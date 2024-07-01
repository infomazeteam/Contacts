function LoadContactList() {
    var datatable = $('#contactgrid').dataTable();
    datatable.fnDestroy();
    BindContactList();
}


function BindContactList() {
    $('#contactgrid').DataTable({
            ajax: {
                url: "Contact/ContactList",
                type: "POST",
            },
            processing: true,
            serverSide: true,
            filter: true,
            paging: true,
            ordering: true,
            lengthChange: true,
            order: [[0, 'asc']], // Initial sorting by the first column (index 0)
            dom: '<"datatable-header"fl><"datatable-scroll-wrap"t><"datatable-footer"ip>',
            "columns": [
                {
                    "data": "contactID", "sorting": false, "orderable": false, "className": "Width-150 text-center",
                    "render": function (data, type, row, meta) {
                        Action = '<a  href="javascript:void(0);" onclick="ContactDetail(' + row.contactID + ');">View</a>' +
                            ' <a href = "/Contact/Edit/' + row.contactID + '" >Edit</a>' +
                            ' <a class="text-danger" href="javascript:void(0);" onclick="ContactDelete(' + row.contactID + ');">Delete Contact</a>';
                        return Action;
                    }
                },
                {
                    "data": "firstName", "name": "First Name", "className": "",
                    "render": function (data, type, row, meta) {
                        return ((data != null && data != "") ? data : "-");
                    }
                },
                {
                    "data": "lastName", "name": "Last Name", "className": "",
                    "render": function (data, type, row, meta) {
                        return ((data != null && data != "") ? data : "-");
                    }
                },
                {
                    "data": "email", "name": "Email", "className": " ",
                    "render": function (data, type, row, meta) {
                        return ((data != null && data != "") ? data : "-");
                    }
                },
                {
                    "data": "mobile", "name": "Mobile", "className": " ",
                    "render": function (data, type, row, meta) {
                        return ((data != null && data != "") ? data : "-");
                    }
                },
                {
                    "data": "phone", "name": "Phone", "className": " ",
                    "render": function (data, type, row, meta) {
                        return ((data != null && data != "") ? data : "-");
                    }
                },
                {
                    "data": "address1", "name": "Address1", "className": " ",
                    "render": function (data, type, row, meta) {
                        return ((data != null && data != "") ? data : "-");
                    }
                },
                {
                    "data": "address2", "name": "Address2", "className": " ",
                    "render": function (data, type, row, meta) {
                        return ((data != null && data != "") ? data : "-");
                    }
                },
                {
                    "data": "city", "name": "City", "className": " ",
                    "render": function (data, type, row, meta) {
                        return ((data != null && data != "") ? data : "-");
                    }
                },
                {
                    "data": "state", "name": "City", "className": " ",
                    "render": function (data, type, row, meta) {
                        return ((data != null && data != "") ? data : "-");
                    }
                },
                {
                    "data": "zip", "name": "City", "className": " ",
                    "render": function (data, type, row, meta) {
                        return ((data != null && data != "") ? data : "-");
                    }
                },
                {
                    "data": "country", "name": "City", "className": " ",
                    "render": function (data, type, row, meta) {
                        return ((data != null && data != "") ? data : "-");
                    }
                },
            ],
        }
    );
}

function ContactDelete(id) {
    swal({
        title: "Delete",
        text: "Are you sure you want to delete this contact?",
        showCancelButton: true,
        confirmButtonColor: "#EF5350",
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        closeOnConfirm: true,
        closeOnCancel: true
    },
    function (isConfirm) {
        if (isConfirm) {
            DeleteDelete(id);
        }
        else {
            return false;
        }
    });
}

function DeleteDelete(id) {
    fetch('/Contact/Delete/' + id, {
        method: 'POST',  // Correcting method to DELETE
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            window.location.reload();
        } else {
            // Optionally handle errors
            swal('Error!', 'Failed to delete record.', 'error');
        }
    }).catch(error => {
        console.error('Error:', error);
        swal('Error!', 'Failed to delete record.', 'error');
    });
}


function ContactDetail(id) {
    var url = '/Contact/Details';
    $.get(url, { id: id }, function (data) {
        $('#popmodel .modal-content').html("").hide().html(data).fadeIn(50);
        $("#popmodel").modal('show');
        $("#contacttitle").text("Conatct Details");
    });
}


function OnsiteAdditionalDocumentForm(SiteID, OnsiteTicketIDGUID) {
    BackbuttonID = [];
    BackbuttonID.push(0);
    var CustomerID = $("#hdnCustomerID").val();
    var ParentID = $("#ParentIDdetails").val();
    $(".page-roller-spin-fullpage").removeClass('invisible').fadeIn("slow");
    var url = companymappings.SiteUrl + 'OnsiteTickets/OnsiteAdditionalDocumentForm';
    $.get(url, { SiteID: SiteID, CustomerID: CustomerID, ParentID: ParentID }, function (data) {
        $('#popmodel .modal-body').html("").hide().html(data).fadeIn(50);
        $('#popmodel .modal-dialog').removeClass("modal-sm");
        $('#popmodel .modal-dialog').addClass("modal-xlg");
        $("#popmodel .modal-title").text(LanguageConvert("Document"));
        $("#popmodel").modal('show');
        $("#btnsave").text(LanguageConvert('Submit'));
        $(".page-roller-spin-fullpage").fadeOut("slow");
    });
}

var Contactorm_DplctCnt = 0;
$('#btncontactsubmit').on('click', function (e) {
    if (!$("#ContactForm").valid()) {
        return false;
    }
    else {
        if (Contactorm_DplctCnt == 0) {
            Contactorm_DplctCnt++;
            $("#ContactForm").submit();
            $("#btncontactsubmit").prop('disabled', true);
        }
        else {

            return false;
        }
    }
});