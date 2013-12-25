var sonarQubeServer = function(serverURL,displayName) {
  var serverURL = serverURL;
  var displayName=displayName;
};



$(document).ready(function() {
  $("#buttonSave").click(function() {
    var serverURL = $("#ServerURL").val();
    var displayName = $("#DisplayName").val();
    console.log(serverURL + " - "+ displayName);

    if (window.localStorage) {
      localStorage.clear();
      localStorage.setItem("sqserver",serverURL);
      alert("added");
    }


  });

});
