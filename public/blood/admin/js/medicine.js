
/**
 * create medicine
 */
$(document).on('click', '#createMedicine', function (e) {
    e.preventDefault();    
    var form_data = new FormData($("#createMedicineForm")[0]);
    form_data.append('symptom_id', $("#symptom_id :selected").val());
    form_data.append('dose', $("#dose").val());
    $.ajax({
        type:'POST',
        url: "/admin/medicine/store",
        headers: { 'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content') },
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        data: form_data,
        success:function(response){ 
            if((response.errors)){
               
                if(response.errors.symptom_id) {
                    $('.errorSymptom').text(response.errors.symptom_id);
                }
                if(response.errors.dose) {
                    $('.erroDose').text(response.errors.dose);
                }
            }else{ console.log(response);
                if(response.status === 201) {
                    $('#addMedicineModal').modal('hide');
                    toastr.success('Medicine successfully created')
                    var status = response.data.status == 1 ? 'Show' : 'Hide';
                    $("#allmedicine").append('' +
                        '<tr class="medicine-'+ response.data.id +'">\n' +
                            '<td>'+ response.data.symptom_name +'</td>\n' +
                            '<td>'+ response.data.dose +'</td>\n' +
                            '<td>'+ status +'</td>\n' +
                            '<td style="vertical-align:middle;text-align:center;">\n' +
                                '<button class="btn btn-warning btn-sm" data-toggle="modal" id="editMedicine" data-target="#editMedicineModal" data-id="'+ response.data.id +'"  data-symptom_id="'+ response.data.symptom_id +'"  data-dose="'+ response.data.dose +'" data-status="'+ response.data.status +'"  title="Edit"><i class="fas fa-pencil-alt"></i></button>\n' +
                                '<button class="btn btn-danger btn-sm" data-toggle="modal" id="deleteMedicine" data-target="#deleteMedicineModal" data-id="'+ response.data.id +'" title="Delete"><i class="fas fa-trash"></i></button>\n' +
                            '</td>\n' +
                        '</tr>'+
                    '');
                } else {
                    $("#symptom_id").val('');
                    $("#dose").val('');
                }               
            }
        }
    });
});

/**
 * Edit Medicine
 */
$(document).on('click', '#editMedicine', function () {
    $('#editMedicineModal').modal('show');
    $('#edit_id').val($(this).data('id'));
    $('#edit_symptom_id').val($(this).data('symptom_id'));
    $('#edit_dose').val($(this).data('dose'));
    $('#edit_status').val($(this).data('status'));
 })

// update Medicine
$("#updateMedicine").click(function (e) {
    e.preventDefault();
    var form_data = new FormData($("#editMedicineForm")[0]);
    form_data.append('id', $("#edit_id").val());
    form_data.append('symptom_id', $("#edit_symptom_id :selected").val());
    form_data.append('dose', $("#edit_dose").val());
    form_data.append('status', $("#edit_status :selected").val());
    $.ajax({
        type:'POST',
        url: "/admin/medicine/update",
        headers: { 'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content') },
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        data: form_data,
        success:function(response){
            if((response.errors)){
                if(response.errors.symptom_id){
                    $('.errorSymptom').text(response.errors.symptom_id);
                }
                if (response.errors.dose) {
                    $('.errorDose').text(response.errors.dose);
                }
            }else{
                var status = response.data.status == 1 ? 'Show' : 'Hide';
                $('#editMedicineModal').modal('hide');
                $("tr.medicine-"+ response.data.id).replaceWith('' +
                    '<tr class="post-'+ response.data.id +'">\n' +
                        '<td>'+ response.data.symptom_name +'</td>\n' +
                        '<td>'+ response.data.dose +'</td>\n' +
                        '<td>'+ status +'</td>\n' +
                        '<td style="vertical-align:middle;text-align:center;">\n' +
                            '<button class="btn btn-warning btn-sm" data-toggle="modal" id="editMedicine" data-target="#editMedicineModal" data-id="'+ response.data.id +'" data-symptom_id="'+ response.data.symptom_id +'"  data-dose="'+ response.data.dose +'" data-status="'+ response.data.status +'"  title="Edit"><i class="fas fa-pencil-alt"></i></button>\n' +
                            '<button class="btn btn-danger btn-sm" data-toggle="modal" id="deleteMedicine" data-target="#deleteMedicineModal" data-id="'+ response.data.id +'" title="Delete"><i class="fas fa-trash"></i></button>\n' +
                        '</td>\n' +
                    '</tr>'+
                '');
                toastr.success('Medicine successfully updated.')
            }
        }
    });
});

//open delete Medicine modal
$(document).on('click', '#deleteMedicine', function () {
    $('#deleteMedicineModal').modal('show');
    $('#del_id').val($(this).data('id'));
 });

//destroy Medicine
$("#destroyMedicine").click(function(){
    $.ajax({
        type: 'POST',
        url: "/admin/medicine/destroy",
        headers: { 'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content') },
        data: {
            id: $('#del_id').val()
        },
        success: function (response) {
            $('#deleteMedicineModal').modal('hide');            
            $('.faq-' + $('#del_id').val()).remove();
            toastr.success(response.message)
        }
    });
});