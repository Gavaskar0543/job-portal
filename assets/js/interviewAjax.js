{
   

        let createInterview = () =>{
        let createInterForm = $('#newInterviewForm');
        console.log(createInterForm);

       
       createInterForm.submit(function (e) { 
            e.preventDefault();
            console.log('Please wait while we process your request.');

            $.ajax({
                type: 'POST',
                url: '/inter/newOne',
                data: createInterForm.serialize(),
                success: (data) => {
                    console.log(data);
                    let newInterView = newInter(data.data.interview);
                    $('#interviewTable tbody').prepend(newInterView);
                },
                error: (xhr, textStatus, errorThrown) => {
                    console.log(xhr.responseText);
                }
            });
        });
    }
    
    let newInter = (interviews) =>{
        return $(`   
            
            <tr id="interview-${interviews._id}>
              <td> ${ interviews.date } </td>
              <td> ${ interviews.company } </td>
              <td>
                <a href="/students" class="btn btn-info btn-sm">View Students</a>
            <a href='/inter/destroy/${ interviews._id }' class="btn btn-danger btn-sm delete-interview">Delete</a>
              </td>
            </tr>

            `);
    }
  
   
      
     //delete interview form database
    let deleteStudent = () =>{
        let deleteLink = $('.delete-student');
        console.log(deleteLink);
      
            $(deleteLink).click((e)=>{
                e.preventDefault();
                $.ajax({
                    type: 'GET',
                    url: $(deleteLink).prop('href'),
                    success: (data) => {
                        console.log(data);
                        $(`#student-${data.data.student_id}`).remove();
                    },
                    error: (xhr, textStatus, errorThrown) => {
                        console.log(xhr.responseText);
                    }
                });
            });
        
    }

//delete interview form database


   
   deleteStudent();
   createInterview();
  

}
