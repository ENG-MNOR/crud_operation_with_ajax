loadData();
let btnAction="insert";
$("#AddNew").click(function(){
    $("#StudentModal").modal("show");
    
})
$("#studentForm").submit(function(event){
    event.preventDefault();
    // gets form data
    let form_data=new FormData($("#studentForm")[0]);
    if(btnAction=="insert"){
    form_data.append("action","registerStudent");}
    else{
        form_data.append("action","updateStudent"); 
    }
    
    $.ajax({
        method:"post",
        url:"api.php",
        dataType:"JSON",
        data:form_data,
        contentType:false,
        processData:false,
        success:function(data){
        //  console.log(data);
        let status=data.status;
        let response=data.data;
        $("#studentForm")[0].reset();
        btnAction="insert";
        loadData();
    $("#StudentModal").modal("hide");
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: '😊'+response,
        showConfirmButton: false,
        timer: 1500
      })
        // console.log(status);
        // alert(response);
        },
        error:function(data){
        console.log(data); 
        }

    })
})

function loadData(){
    $("#studentTable tbody").html("");
    let sendingData={
        "action":"readAll"
    }
$.ajax({
    method:"post",
     url:"api.php",
     datatype:"JSON",
     data:sendingData,
     success:function(data){
        let status=data.status;
        let response=data.data;
        let tr='';
        let html='';
        if(status){
            response.forEach(element => {
                tr+="<tr>";
                for(let i in element) {
                   tr+=`<td>${element[i]}</td>`
                }
                tr+=`<td><a class="btn btn-info update_info" update_id=${element["id"]}><i class="fas fa-edit"></i></a>&nbsp;&nbsp;<a class="btn btn-danger delete_info" delete_id=${element["id"]}><i class="fas fa-trash"></i></a></td>`;
                tr+="</tr>";
            } );
           $("#studentTable tbody").append(tr); 
            
        }

     },
     error:function(data){

     }

})
}
function fetchInfo(id){
    let sendingData={
        "action":"readStudentInfo",
        "id":id,
    }
$.ajax({
    method:"post",
     url:"api.php",
     datatype:"JSON",
     data:sendingData,
     success:function(data){
        let status=data.status;
        let response=data.data;
        let tr='';
        let html='';
        if(status){
            $("#id").val(response[0].id);
            $("#name").val(response[0].name);
            $("#class").val(response[0].class);
            btnAction="update"
            $("#StudentModal").modal("show");
            
        }

     },
     error:function(data){

     }

})
}
function deleteStudent(id){
    let sendingData={
        "action":"deleteStudent",
        "id":id,
    }
$.ajax({
    method:"post",
     url:"api.php",
     datatype:"JSON",
     data:sendingData,
     success:function(data){
        let status=data.status;
        let response=data.data;
        let tr='';
        let html='';
        if(status){
           loadData();

            
        }

     },
     error:function(data){

     }

})
}

function  fetchInfodelete(id){
    let name;
    let sendingData={
        "action":"readStudentInfo",
        "id":id,
    }
$.ajax({
    method:"post",
     url:"api.php",
     datatype:"JSON",
     data:sendingData,
     success:function(data){
        let status=data.status;
        let response=data.data;
        let tr='';
        let html='';
        if(status){
            alert(response[0].name);
                  
        }
// console.log(name);
     },
     error:function(data){
        // return name =response[0].name;
           
     }

})

}
$("#studentTable").on("click","a.update_info",function(){
let id= $(this).attr("update_id");
fetchInfo(id);
})
$("#studentTable").on("click","a.delete_info",function(){
    let id= $(this).attr("delete_id");
    fetchInfodelete(id);
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            deleteStudent(id);
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })
        
    
    
    })