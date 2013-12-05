

document.addEventListener('DOMComponentsLoaded', function(){
    // demonstrate dynamic tab-target handling in slidebox demo
    var slideBox = document.querySelector('x-slidebox');
    var slideBoxTabbar = document.getElementById("slide-box-tabbar");

    // assign each tab to its respective slide in the slidebox
    var tabs = slideBoxTabbar.tabs;
    var slides = xtag.query(slideBox, 'x-slide');
    for(var i=0; i < slides.length && i < tabs.length; i++){
        var tab = tabs[i];
        var slide = slides[i];

        // assign each slide to its respective tabbar tab
        tab.targetElems = [slide];
    }
});

var projectsIsDownloaded=false;
var pluginsIsDownloaded=false;
var usersIsDownloaded=false;


$(document).ready(function() {
    $("#btnProjects").click(function() {

      if(projectsIsDownloaded)
        return true;


      var xhr = new XMLHttpRequest({
        mozSystem : true
      });

      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {

          var obj = jQuery.parseJSON(xhr.responseText);
          var result = "";

          console.log('obj length:'+obj.length);

          for (var i = 0; i < obj.length; i++) {
            var res = obj[i];
            console.log(res.id + ' - ' + res.name);
            result += "<li><p>" + res.name + "</p><p>"+res.lang+"</p></li>";
          }
          $('#searchResultsProjects').html(result);
          $('#searchResultsProjects').listview('refresh');
        }
      }
      xhr.open("GET", "http://nemo.sonarqube.org/api/resources?format=json", true);
      xhr.send();

      projectsIsDownloaded=true;
    });

    $("#btnPlugins").click(function() {

        if(pluginsIsDownloaded)
            return true;


        var xhr = new XMLHttpRequest({
          mozSystem : true
        });
        xhr.open("GET", "http://nemo.sonarqube.org/api/updatecenter/installed_plugins?format=json", true);

        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4) {
            var obj = jQuery.parseJSON(xhr.responseText);

            console.log(obj.length);

            var result = "";
            for (var i = 0; i < obj.length; i++) {
              var res = obj[i];
              result += "<li><p>" + res.name + "</p><p>"+res.version+"</p></li>";
            }
            $("#searchResultsPlugins").html(result);
            $('#searchResultsPlugins').listview('refresh');
          }
        }
        xhr.send();
        pluginsIsDownloaded=true;
      });

    $("#btnUsers").click(function() {

        if(usersIsDownloaded)
            return true;


        var xhr = new XMLHttpRequest({
          mozSystem : true
        });
        xhr.open("GET", "http://nemo.sonarqube.org/api/users/search?format=json", true);

        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4) {
            var obj = jQuery.parseJSON(xhr.responseText);

            var result = "";
            for (var i = 0; i < obj['users'].length; i++) {
              var res = obj['users'][i];
              result += "<li><p>" + res.name + "</p><p>"+(res.email==null?'':res.email)+"</p></li>";
            }
            $("#searchResultsUsers").html(result);
            $('#searchResultsUsers').listview('refresh');
          }
        }
        xhr.send();
        usersIsDownloaded=true;
      });

  });
