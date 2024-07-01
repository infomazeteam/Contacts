/* ------------------------------------------------------------------------------
*
*  # Basic datatables
*
*  Specific JS code additions for datatable_basic.html page
*
*  Version: 1.0
*  Latest update: Aug 1, 2015
*
* ---------------------------------------------------------------------------- */


$(document).on('click', '.dataTable .dropdown-toggle', function () {
    if ($(window).width() > 1600) {
        $('body').addClass('dropDownOpenCustom');
    }
});

$(document).ready(function () {
    $('body').on('hide.bs.dropdown', function () {
        $('body').removeClass('dropDownOpenCustom');
    });
});



$(function() {
	/*columnDefs: [{ 
		orderable: false,
		targets: 0
	}],*/

    // Table setup
    // ------------------------------

    // Setting datatable defaults
    $.extend( $.fn.dataTable.defaults, {
        autoWidth: false,
        dom: '<"datatable-header"fl><"datatable-scroll-wrap"t><"datatable-footer"ip>',
        language: {
            search: '<span>Filter:</span> _INPUT_',
            searchPlaceholder: 'Type to filter...',
            lengthMenu: '<span>Show:</span> _MENU_',
            paginate: { 'first': 'First', 'last': 'Last', 'next': '&rarr;', 'previous': '&larr;' }
        },
        drawCallback: function () {
            if ($(window).width() < 1600) {
                $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').addClass('dropup');
            }
        },
        preDrawCallback: function() {
            $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').removeClass('dropup');
        }
    });


    // Basic datatable
    $('.datatable-basic').DataTable();
    $('.datatable-pto').DataTable({
		"order": [[ 2, "desc" ]]
	});
    $('.datatable-employee-list').DataTable({
		"order": [[ 1, "desc" ]]
	});


    // Alternative pagination
    $('.datatable-pagination').DataTable({
        pagingType: "simple",
        language: {
            paginate: {'next': 'Next &rarr;', 'previous': '&larr; Prev'}
        }
    });


    // Datatable with saving state
    $('.datatable-save-state').DataTable({
        stateSave: true
    });


    // Scrollable datatable
    $('.datatable-scroll-y').DataTable({
        autoWidth: true,
        scrollY: 300
    });



    // External table additions
    // ------------------------------

    // Enable Select2 select for the length option
    $('.dataTables_length select').select2({
        minimumResultsForSearch: Infinity,
        width: 'auto'
    });

    $('.datatable-performance').DataTable({
        dom: '<"datatable-scroll"t><"datatable-footer"lpi>',
        "ordering": false,

    });

    $('.datatable-performance-setup').DataTable({
        autoWidth: false,
        scrollX: true,
        bSort: false,
        dom: '<"datatable-scroll"t>',
        scrollCollapse: true,
        fixedColumns: {
            leftColumns: 2
        }
    });

    $('.datatable-performance-details').DataTable({
        autoWidth: false,
        scrollX: true,
        bSort: false,
        dom: '<"datatable-scroll"t>',
        scrollCollapse: true,
        fixedColumns: {
            leftColumns: 2
        }

    });

    $('.datatable-performance-setup-vision').DataTable({
        autoWidth: false,
        scrollX: true,
        dom: '<"datatable-scroll"t>',
        scrollCollapse: true,
        fixedColumns: {
            leftColumns: 2
        }

    });

    $('.datatable-performance-setup-delegation').DataTable({
        autoWidth: false,
        scrollX: true,
        dom: '<"datatable-scroll"t>',
        scrollCollapse: true,
        fixedColumns: {
            leftColumns: 2
        }

    });

    $('.datatable-performance-setup-teamwork').DataTable({
        autoWidth: false,
        scrollX: true,
        dom: '<"datatable-scroll"t>',
        scrollCollapse: true,
        fixedColumns: {
            leftColumns: 2
        }

    });
    
});
