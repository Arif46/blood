//create Faq
$("#createAmbulance").click(function (e) {
    e.preventDefault();
    var name = $("#name").val();
    var driver_name = $("#driver_name").val();
    var driver_phone = $("#driver_phone").val();
    $.ajax({
        type:'POST',
        url: "/admin/ambulance/store",
        headers: { 'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content') },
        data: {name:name,driver_name:driver_name,driver_phone:driver_phone},
        success:function(response){
            if((response.errors)){
                if(response.errors.question){
                    $('.errorQuestion').text(response.errors.question);
                }
                if(response.errors.answer){
                    $('.errorAnswer').text(response.errors.answer);
                }
            }else{
                $('#addAmbulanceModal').modal('hide');
                $("#allambulance").append('' +
                    '<tr class="faq-'+ response.data.id +'">\n' +
                        '<td>'+ response.data.name +'</td>\n' +
                        '<td>'+ response.data.driver_name +'</td>\n' +
                        '<td>'+ response.data.driver_phone +'</td>\n' +
                        '<td style="vertical-align:middle;text-align:center;">\n' +
                            '<button class="btn btn-warning btn-sm" data-toggle="modal" id="editFaq" data-target="#editAmbulanceModal" data-id="'+ response.data.id +'" data-name="'+ response.data.name +'" data-driver_name="'+ response.data.driver_name +'" data-driver_phone="'+ response.data.driver_phone +'" title="Edit"><i class="fas fa-pencil-alt"></i></button>\n' +
                            '<button class="btn btn-danger btn-sm" data-toggle="modal" id="deleteAmbulance" data-target="#deleteAmbulanceModal" data-id="'+ response.data.id +'" title="Delete"><i class="fas fa-trash"></i></button>\n' +
                        '</td>\n' +
                    '</tr>'+
                '');
                $("#question").val('');
                $("#answer").val('');
                toastr.success('Ambulance successfully created')
            }
        }
    });
});

//open edit Faq modal
$(document).on('click', '#editAmbulance', function () {
    $('#editAmbulanceModal').modal('show');
    $('#edit_id').val($(this).data('id'));
    $('#edit_name').val($(this).data('name'));
    $('#edit_driver_name').val($(this).data('driver_name'));
    $('#edit_driver_phone').val($(this).data('driver_phone'));
 });

// update Faq
$("#updateAmbulance").click(function (e) {
    e.preventDefault();
    var id            = $("#edit_id").val();
    var name          = $("#edit_name").val();
    var driver_name   = $("#edit_driver_name").val();
    var driver_phone  = $("#edit_driver_phone").val();
    $.ajax({
        type:'POST',
        url: "/admin/ambulance/update",
        headers: { 'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content') },        
        data: {id:id,name:name,driver_name:driver_name,driver_phone:driver_phone},
        success:function(response){
            if((response.errors)){
                if(response.errors.name){
                    $('.errorQuestion').text(response.errors.name);
                }
                if(response.errors.driver_name){
                    $('.errorAnswer').text(response.errors.driver_name);
                }
                if(response.errors.driver_phone){
                    $('.errorAnswer').text(response.errors.driver_phone);
                }
            }else{
                $('#editAmbulanceModal').modal('hide');
                $("tr.faq-"+ response.data.id).replaceWith('' +
                    '<tr class="faq-'+ response.data.id +'">\n' +
                        '<td>'+ response.data.name +'</td>\n' +                        
                        '<td>'+ response.data.driver_name +'</td>\n' +                        
                        '<td>'+ response.data.driver_phone +'</td>\n' +                        
                       '<td style="vertical-align:middle;text-align:center;">\n' +
                            '<button class="btn btn-warning btn-sm" data-toggle="modal" id="editAmbulance" data-target="#editAmbulanceModal" data-id="'+ response.data.id +'" data-name="'+ response.data.name +'" data-driver_name="'+ response.data.driver_name +'" data-driver_phone="'+ response.data.driver_phone +'" title="Edit"><i class="fas fa-pencil-alt"></i></button>\n' +
                            '<button class="btn btn-danger btn-sm" data-toggle="modal" id="deleteAmbulance" data-target="#deleteAmbulanceModal" data-id="'+ response.data.id +'" title="Delete"><i class="fas fa-trash"></i></button>\n' +
                        '</td>\n' +
                    '</tr>'+
                '');
                toastr.success('Ambulance successfully updated.')
            }
        }
    });
});

//open delete Ambulance modal
$(document).on('click', '#deleteAmbulance', function () {
    $('#deleteAmbulanceModal').modal('show');
    $('#del_id').val($(this).data('id'));
 });

//destroy Ambulance
$("#destroyAmbulance").click(function(){
    $.ajax({
        type: 'POST',
        url: "/admin/ambulance/destroy",
        headers: { 'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content') },
        data: {
            id: $('#del_id').val()
        },
        success: function (response) {
            $('#deleteAmbulanceModal').modal('hide');            
            $('.faq-' + $('#del_id').val()).remove();
            toastr.success(response.message)
        }
    });
});