{let e=()=>{let t=$("#newInterviewForm");console.log(t),t.submit(function(e){e.preventDefault(),console.log("Please wait while we process your request."),$.ajax({type:"POST",url:"/inter/newOne",data:t.serialize(),success:e=>{console.log(e);e=o(e.data.interview);$("#interviewTable tbody").prepend(e)},error:(e,t,o)=>{console.log(e.responseText)}})})},o=e=>$(`   
            
            <tr id="interview-${e._id}>
              <td> ${e.date} </td>
              <td> ${e.company} </td>
              <td>
                <a href="/students" class="btn btn-info btn-sm">View Students</a>
            <a href='/inter/destroy/${e._id}' class="btn btn-danger btn-sm delete-interview">Delete</a>
              </td>
            </tr>

            `),t=()=>{let t=$(".delete-student");console.log(t),$(t).click(e=>{e.preventDefault(),$.ajax({type:"GET",url:$(t).prop("href"),success:e=>{console.log(e),$("#student-"+e.data.student_id).remove()},error:(e,t,o)=>{console.log(e.responseText)}})})},n=()=>{let t=$(".delete-interview");console.log(t),$(t).click(e=>{e.preventDefault(),$.ajax({type:"GET",url:$(t).prop("href"),success:e=>{console.log(e),$("#interview-"+e.data.interview_id).remove()},error:(e,t,o)=>{console.log(e.responseText)}})})};n(),t(),e()}