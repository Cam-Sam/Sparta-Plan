//clear chrome storage
$(function () {
    $('#clear').click(function(){
chrome.storage.sync.set({"ulList":[]});
});
});
/*
//checked function
$(function() {
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);
});*/

//toggles bell picture
$(function(){
        $("#bell").click(function() {
            $("#bellPic").toggle();
        });
});
//erasure function
function erase() {
   var myList = document.getElementsByTagName("li");
   var iv;
chrome.storage.sync.get({"ulList":[]}, function(items) {
   var ulLength= items.ulList.length;
   for (iv = 0; iv < ulLength; iv++) {
       if(myList[iv].innerHTML==="ERASED"){
       var tasks=new Array();
       //copies saved array
       tasks= items.ulList.slice();
       //pushes blank value
       tasks[iv]="ERASED";
       chrome.storage.sync.set({"ulList":tasks});
           }
           else{
           continue;
           }
       }
});
}
//load
$(function(){
    chrome.storage.sync.get({"ulList":[]}, function (items) {
    var taskTexts=new Array();
    taskTexts=items.ulList.slice();
    var i;
for ( i = 0 ; i < taskTexts.length; i++){
    var li = document.createElement("li");
    var t = document.createTextNode(taskTexts[i]);
    if ( taskTexts[i] === "") {
          continue;
        } else {
    li.appendChild(t);
    document.getElementById("myUL").appendChild(li);
    //creates close button
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);
    //keep ERASED stuff hidden
    if ( taskTexts[i] === "ERASED") {
        li.style.display="none";
    }
    //close function
    var ia;
        for (ia = 0; ia < close.length; ia++) {
          close[ia].onclick = function() {
            var div = this.parentElement;
            div.style.display = "none";
            div.innerHTML="ERASED";
            erase();
          }
        }
    }
    }
    });
    });
//adds task
$(function(){
    $('#addBtn').click(function(){
    //creates and stores value
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    //can't be empty
    if (inputValue === '') {
          alert("You must write something!");
        } else {
                  document.getElementById("myUL").appendChild(li);
        }
//store strings into array
    chrome.storage.sync.get({"ulList":[]}, function(items) {
    var taskTexts=new Array();
    if(items.ulList){
    //copies saved array
    taskTexts= items.ulList.slice(0);
    //pushes new value
    taskTexts.push(inputValue);
    //stores
    }
    else{
    taskTexts.push(inputValue);
    }
    chrome.storage.sync.set({"ulList":taskTexts});
        });
//creates close button
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);
//close function
        for (i = 0; i < close.length; i++) {
          close[i].onclick = function() {

            var div = this.parentElement;
            div.style.display = "none";
            div.innerHTML="ERASED";
            erase();
          }
        }
                //clears UI
        document.getElementById("myInput").value = "";
    });
});

// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("li");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
   var div = this.parentElement;
    div.style.display = "none";
    div.innerHTML="ERASED";
    erase();
    }
}