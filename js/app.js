var xhr;

$(document).ready(function() {
  $("#buttonProjects").click(function() {
    sendXHR("GET", "http://nemo.sonarqube.org/api/resources?format=json", processProjects());
  });

  $("#buttonPlugins").click(function() {
    sendXHR("GET", "http://nemo.sonarqube.org/api/updatecenter/installed_plugins?format=json", processPlugins());
  });

  $("#buttonUsers").click(function() {
    sendXHR("GET", "http://nemo.sonarqube.org/api/users/search?format=json", processUsers());
  });
});

function sendXHR(requestType, requestURL, handler) {
  xhr = new XMLHttpRequest({
    mozSystem : true
  });
  xhr.onreadystatechange = handler;
  xhr.open(requestType, requestURL, true);
  xhr.send();
}

function processProjects() {
  return function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var obj = jQuery.parseJSON(xhr.responseText);
      var result = "";

      for (var i = 0; i < obj.length; i++) {
        var res = obj[i];
        result += "<li><p>" + res.name + "</p><p>" + res.lang + "</p></li>";
      }
      $('#resultsProjects').html(result);
      $('#resultsProjects').listview('refresh');
    }
  }
}

function processUsers() {
  return function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var obj = jQuery.parseJSON(xhr.responseText);

      var result = "";
      for (var i = 0; i < obj['users'].length; i++) {
        var res = obj['users'][i];
        result += "<li><p>" + res.name + "</p><p>" + (res.email == null ? '' : res.email) + "</p></li>";
      }
      $("#resultsUsers").html(result);
      $('#resultsUsers').listview('refresh');
    }
  }
}

function processPlugins() {
  return function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var obj = jQuery.parseJSON(xhr.responseText);
      var result = "";
      for (var i = 0; i < obj.length; i++) {
        var res = obj[i];
        result += "<li><p>" + res.name + "</p><p>" + res.version + "</p></li>";
      }
      $("#resultsPlugins").html(result);
      $('#resultsPlugins').listview('refresh');
    }
  }
}
