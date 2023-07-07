// //ajax request to send data to db
// {
    
//     let createInterForm = $('#newInterviewForm');
//     console.log(createInterForm);

// let btn = $('#createInterviewBtn')
// btn.click((e)=>{
//     e.preventDefault();
//     console.log('please wait while we processing')

//     $.ajax({
//         type:'',
//         url :'/inter/create',
//         data : createInterForm.serialize(),
//         success:(data) =>{
//             console.log(data);
//         },
//         error:(error) =>{
//             console.log(error.responsText);
//         }
//     });

    
// })
// }


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
            
            <tr>
              <td> ${ interviews.date } </td>
              <td> ${ interviews.company } </td>
              <td>
                <a href="/students" class="btn btn-info btn-sm">View Students</a>
            <a href='/inter/destroy/${ interviews._id }'><button class="btn btn-danger btn-sm">Delete</button></a>
              </td>
            </tr>

            `);
    }
  
   
      
     

  
      

    createInterview();
  

}
