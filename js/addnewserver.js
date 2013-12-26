
function Server(serverURL, displayName, userName, password) {
  this.serverURL = serverURL;
  this.displayName = displayName;
  this.userName = userName;
  this.password = password;
}

$(document).ready(function() {
  $("#buttonSave").click(function() {
    var serverURL = $("#ServerURL").val();
    var displayName = $("#DisplayName").val();
    var userName = $("#UserName").val();
    var passw = $("#Passw").val();

    console.log(serverURL);
    console.log(displayName);
    console.log(userName);
    console.log(passw);

    if (window.localStorage) {
      localStorage.clear();
      var sqserver=new Server(serverURL,displayName,userName,passw);
      localStorage.setItem("sqserver", JSON.stringify(sqserver));
      alert("added");
    }

  });

});
