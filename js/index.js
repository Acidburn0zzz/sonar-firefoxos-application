var xhr = new XMLHttpRequest({
  mozSystem : true
});

var projectsAreLoaded = false;
var pluginsAreLoaded = false;
var usersAreLoaded = false;

function sendEmail(toEmail, subject, body) {
  var createEmail = new MozActivity({
    name : "new",
    data : {
      type : "mail",
      url : "mailto:" + toEmail + "?&subject=" + subject + "&body=" + body + "",
    }
  });
}

function sendXHR(requestType, requestURL, handler) {

  xhr.onreadystatechange = handler;
  xhr.open(requestType, requestURL, true);
  xhr.onerror = function() {
    console.log('Error loading data');
  };

  xhr.send();
}

$(document).ready(function() {

  populateProjectsTab();

  $("#buttonProjects").click(function() {
    populateProjectsTab();
  });

  $("#buttonPlugins").click(function() {
    populatePluginsTab();
  });

  $("#buttonUsers").click(function() {
    populateUsersTab()
  });
});

function populateProjectsTab() {
  console.log("populateProjectsTab");

  $("#buttonProjects").css("color", "rgb(98, 198, 245)");
  $("#buttonUsers").css("color", "white");
  $("#buttonPlugins").css("color", "white");
  $("#tabpanel1").css("z-index", "0");
  $("#resultsProjects").css("visibility", "visible");
  $("#resultsPlugins").css("visibility", "hidden");
  $("#resultsUsers").css("visibility", "hidden");

  if (!projectsAreLoaded)
    sendXHR("GET", "http://nemo.sonarqube.org/api/resources?format=json", processProjects());
}

function populateUsersTab() {
  console.log("populateUsersTab");

  $("#buttonProjects").css("color", "white");
  $("#buttonUsers").css("color", "rgb(98, 198, 245)");
  $("#buttonPlugins").css("color", "white");
  $("#tabpanel2").css("z-index", "0");
  $("#resultsProjects").css("visibility", "hidden");
  $("#resultsPlugins").css("visibility", "hidden");
  $("#resultsUsers").css("visibility", "visible");

  if (!usersAreLoaded)
    sendXHR("GET", "http://nemo.sonarqube.org/api/users/search?format=json", processUsers());
}

function populatePluginsTab() {
  console.log("populatePluginsTab");

  $("#buttonProjects").css("color", "white");
  $("#buttonUsers").css("color", "white");
  $("#buttonPlugins").css("color", "rgb(98, 198, 245)");
  $("#tabpanel3").css("z-index", "0");
  $("#resultsProjects").css("visibility", "hidden");
  $("#resultsPlugins").css("visibility", "visible");
  $("#resultsUsers").css("visibility", "hidden");

  if (!pluginsAreLoaded)
    sendXHR("GET", "http://nemo.sonarqube.org/api/updatecenter/installed_plugins?format=json", processPlugins());
}

function processProjects() {
  console.log("in process projects function: " + xhr.readyStat + " -- " + xhr.status);
  return function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var obj = jQuery.parseJSON(xhr.responseText);
      for (var i = 0; i < obj.length; i++) {
        $('#resultsProjects').append("<li><p>" + obj[i].name + "</p><p>" + obj[i].lang + "</p></li>");
      }
      projectsAreLoaded = true;
    } else {
      console.log("did not get data " + xhr.status);
    }
  }
}

function processUsers() {
  console.log("in process users function: " + xhr.readyStat + " -- " + xhr.status);
  return function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var obj = jQuery.parseJSON(xhr.responseText);
      for (var i = 0; i < obj['users'].length; i++) {

        var sendMail = '';
        if (obj['users'][i].email != null) {
          sendMail = '<a href="javascript:;" onclick="sendEmail(\'' + obj['users'][i].email + '\',\'\',\'\');">' + obj['users'][i].email + '</a>';
        }
        $('#resultsUsers').append("<li><p>" + obj['users'][i].name + "</p><p>" + sendMail + "</p></li>");

      }
      usersAreLoaded = true;
    } else {
      console.log("did not get data " + xhr.status);
    }
  }
}

function processPlugins() {
  console.log("in process plugins function: " + xhr.readyStat + " -- " + xhr.status);
  return function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var obj = jQuery.parseJSON(xhr.responseText);
      for (var i = 0; i < obj.length; i++) {
        $('#resultsPlugins').append("<li><p>" + obj[i].name + "</p><p>" + obj[i].version + "</p></li>");
      }
      pluginsAreLoaded = true;
    } else {
      console.log("did not get data " + xhr.status);
    }
  }
}
