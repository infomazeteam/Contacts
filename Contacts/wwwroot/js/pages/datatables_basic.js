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
    $('body').addClass('dropDownOpenCustom')
});

$(document).ready(function () {
    $('body').on('hide.bs.dropdown', function () {
        $('body').removeClass('dropDownOpenCustom');
    });
});

$(function () {
    
    

    $(document).ready(function () {
        $('body').on('hide.bs.dropdown', function () {
            $('body').removeClass('dropDownOpenCustom');
        });
    });

	/*columnDefs: [{ 
		orderable: false,
		targets: 0
	}],*/

    // Table setup
    // ------------------------------

    // Setting datatable defaults
    $.extend($.fn.dataTable.defaults, {
        autoWidth: false,
        //dom: '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
        dom: '<"datatable-scroll"t><"datatable-footer customFooter"lpi>',
        language: {
            search: '<span>Filter:</span> _INPUT_',
            searchPlaceholder: 'Type to filter...',
            lengthMenu: '<span>Show:</span> _MENU_',
            paginate: { 'first': 'First', 'last': 'Last', 'next': '&rarr;', 'previous': '&larr;' }
        },
        drawCallback: function () {
            $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').addClass('dropup');

            if ($('.table-responsive').hasClass('tableScrollable')) {
                var $api = this.api();
                var pages = $api.page.info().pages;
                var rows = $api.data().length;
                if (pages < 2) {
                    $('.datatable-footer').hide().parent('.dataTables_wrapper').addClass('allTrResultShown');

                }
            }
        },
        preDrawCallback: function () {
            $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').removeClass('dropup');
        }
    });


    // Basic datatable
    $('.datatable-basic').DataTable();

    $('.datatable-pto').DataTable({
        "order": [[2, "desc"]]
    });
    $('.datatable-employee-list').DataTable({
        "order": [[1, "desc"]]
    });


    // Alternative pagination
    $('.datatable-pagination').DataTable({
        pagingType: "simple",
        language: {
            paginate: { 'next': 'Next &rarr;', 'previous': '&larr; Prev' }
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

    //Assets grid
    //$('.datatable-carrier').DataTable({
    //    dom: '<"datatable-scroll"t><"datatable-footer"lpi>',
    //    drawCallback: function () {
    //        $('.dataTables_length select').select2({
    //            minimumResultsForSearch: Infinity,
    //            width: 'auto'
    //        });
    //    }
    //});

    //$('.datatable-network').DataTable({
    //    dom: '<"datatable-scroll"t><"datatable-footer"lpi>',
    //    drawCallback: function () {
    //        $('.dataTables_length select').select2({
    //            minimumResultsForSearch: Infinity,
    //            width: 'auto'
    //        });
    //    }
    //});

    //$('.datatable-srvrsan').DataTable({
    //    dom: '<"datatable-scroll"t><"datatable-footer"lpi>',
    //    drawCallback: function () {
    //        $('.dataTables_length select').select2({
    //            minimumResultsForSearch: Infinity,
    //            width: 'auto'
    //        });
    //    }
    //});

    //$('.datatable-cloudservice').DataTable({
    //    dom: '<"datatable-scroll"t><"datatable-footer"lpi>',
    //    drawCallback: function () {
    //        $('.dataTables_length select').select2({
    //            minimumResultsForSearch: Infinity,
    //            width: 'auto'
    //        });
    //    }
    //});

    //$('.datatable-software').DataTable({
    //    dom: '<"datatable-scroll"t><"datatable-footer"lpi>',
    //    drawCallback: function () {
    //        $('.dataTables_length select').select2({
    //            minimumResultsForSearch: Infinity,
    //            width: 'auto'
    //        });
    //    }
    //});

    //$('.datatable-usermobility').DataTable({
    //    dom: '<"datatable-scroll"t><"datatable-footer"lpi>',
    //    drawCallback: function () {
    //        $('.dataTables_length select').select2({
    //            minimumResultsForSearch: Infinity,
    //            width: 'auto'
    //        });
    //    }
    //});

    //Amulya changes Opportunity Details changes
    // $('.datatable-nrc').DataTable({
    //     dom: '<"datatable-scroll"t><"datatable-footer"lpi>',   
    //});

    //$('.datatable-mrc').DataTable({
    //    dom: '<"datatable-scroll"t><"datatable-footer"lpi>',
    //});

    //$('.datatable-AccountActivity').DataTable({
    //    dom: '<"datatable-scroll"t><"datatable-footer"lpi>',
    //});
    $('.datatable-Stage').DataTable({
        dom: '<"datatable-scroll"t><"datatable-footer"lpi>',
    });
    $('.datatable-StageProgression').DataTable({
        dom: '<"datatable-scroll"t><"datatable-footer"lpi>',
    });
});
