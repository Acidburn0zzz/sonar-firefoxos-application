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
      for (var i = 0; i < obj.length; i++) {
        $('#resultsProjects').append("<li><p>" + obj[i].name + "</p><p>" + obj[i].lang + "</p></li>");
      }
    }
  }
}

function processUsers() {
  return function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var obj = jQuery.parseJSON(xhr.responseText);
      for (var i = 0; i < obj['users'].length; i++) {
        $('#resultsUsers').append("<li><p>" + obj['users'][i].name + "</p><p>" + (obj['users'][i].email == null ? '' : obj['users'][i].email) + "</p></li>");
      }
    }
  }
}

function processPlugins() {
  return function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var obj = jQuery.parseJSON(xhr.responseText);
      for (var i = 0; i < obj.length; i++) {
        $('#resultsPlugins').append("<li><p>" + obj[i].name + "</p><p>" + obj[i].version + "</p></li>");
      }
    }
  }
}
