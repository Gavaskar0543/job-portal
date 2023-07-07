{
  //delete interview from database
  let deleteInterview = function () {
    let deleteLink = $(".delete-interview");
    for (let link of deleteLink) {
      $(link).click(function (e) {
        e.preventDefault();
        $.ajax({
          type: "get",
          url: $(link).prop("href"),
          success: function (data) {
            $(`#interview-${data.data.interview_id}`).remove();
          },
          error: function (error) {
            console.log(error.responseText);
          },
        });
      });
    }
  };

  //delete student from database
  let deleteStudent = function () {
    let deleteLink = $(".delete-student");
    for (let link of deleteLink) {
      $(link).click(function (e) {
        e.preventDefault();
        $.ajax({
          type: "get",
          url: $(link).prop("href"),
          success: function (data) {
            $(`#student-${data.data.student_id}`).remove();
          },
          error: function (error) {
            console.log(error.responseText);
          },
        });
      });
    }
  };

  // Call the functions to bind the click event handlers
  deleteInterview();
  deleteStudent();
}
