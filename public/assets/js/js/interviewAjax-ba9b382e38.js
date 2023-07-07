{let e=()=>{let t=$("#newInterviewForm");console.log(t),t.submit(function(e){e.preventDefault(),console.log("Please wait while we process your request."),$.ajax({type:"POST",url:"/inter/newOne",data:t.serialize(),success:e=>{console.log(e);e=n(e.data.interview);$("#interviewTable tbody").prepend(e)},error:(e,t,n)=>{console.log(e.responseText)}})})},n=e=>$(`   
            
            <tr id="interview-${e._id}">
              <td> ${e.date} </td>
              <td> ${e.company} </td>
              <td>
                <a href="/students" class="btn btn-info btn-sm">View Students</a>
            <a href='/inter/destroy/${e._id}' class="btn btn-danger btn-sm delete-interview">Delete</a>
              </td>
            </tr>

            `);e()}