const observer = new MutationObserver((mutations) => {
  var related = document.getElementById("related");
  if(related) {
    related.parentNode.removeChild(related);
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:5000/api/v1/recommendations", false);
    xhttp.send({"videos": window.location.href});
    console.log(xhttp.responseText);
    var response = JSON.parse(xhttp.responseText);
    console.log(response);
    
    var main = document.getElementById("container"); 
    var rec = document.createElement("div");
    rec.style.cssFloat = "right";
    rec.style.position = "relative";
    rec.style.top = "300px";
    rec.style.clear = "right";
    var list = document.createElement("div");
    list.style.display = "block";
    for(vid of response) {
      var item = document.createElement("div");
      item.style.display = "block";
      item.style.backgroundColor = "#DCDCDC";
      item.style.font = "bold 15px arial";
      item.style.margin = "10px";
      item.style.width = "500px";
      var link = document.createElement("a");
      link.href = vid.video_url;
      var thumbnail = document.createElement("img");
      thumbnail.src = vid.thumbnail_url;
      thumbnail.style.height = "64px";
      thumbnail.style.verticalAlign = "top";
      var titleDiv = document.createElement("div");
      var title = document.createTextNode(vid.title);
      titleDiv.appendChild(title);
      link.appendChild(thumbnail);
      link.appendChild(titleDiv);
      item.appendChild(link);
      console.log("item added");
      list.appendChild(item);
    }
    rec.appendChild(list);
    main.appendChild(rec);
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
