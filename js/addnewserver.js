
function Server(serverURL, displayName, userName, password) {
  this.serverURL = serverURL;
  this.displayName = displayName;
  this.userName = userName;
  this.password = password;
}

function populateInputValuesFromLocalStorage(){
  key = localStorage.key("sqserver");
    if(key){
      val = JSON.parse(localStorage.getItem(key));
      document.getElementById("ServerURL").value=val.serverURL;
      document.getElementById("DisplayName").value=val.displayName;
      document.getElementById("UserName").value=val.userName;
      document.getElementById("Passw").value=val.password;
    }
}

$(document).ready(function() {

  populateInputValuesFromLocalStorage();

  $("#buttonSave").click(function() {
    var serverURL = $("#ServerURL").val();
    var displayName = $("#DisplayName").val();
    var userName = $("#UserName").val();
    var passw = $("#Passw").val();

    if (window.localStorage) {
      localStorage.clear();
      var sqserver=new Server(serverURL,displayName,userName,passw);
      localStorage.setItem("sqserver", JSON.stringify(sqserver));
    }

  });

});
