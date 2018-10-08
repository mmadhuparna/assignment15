async function registerServiceWorker() {
    if('serviceWorker' in navigator) {
        await navigator.serviceWorker.register('./service-worker.js');
        console.log('Service worker registered');
    }
}
registerServiceWorker();

//handling network change
window.addEventListener("load", () => {
               
    function handleNetworkChange(event) {
        var offline = document.querySelector('#offline')
      if (navigator.onLine) {
        offline.classList.remove('offline') ;
        offline.innerHTML = "";
      }
      else {
        offline.classList.add('offline') 
        offline.innerHTML ="No internet connection available. Please check your network settings"
      }
    }
    window.addEventListener("online", handleNetworkChange);
    window.addEventListener("offline", handleNetworkChange);
});

window.onload = function () {

    var title = document.querySelector('#title');
    var statuss = document.querySelector('#status');
    var time = document.querySelector('#time');
    var arrivalList = document.querySelector('#arrival-list');
    
    //fetching data from arrival.jason
    var flight;
    var xhr = new XMLHttpRequest();
        xhr.open('GET', 'arrival.json');
        xhr.send(); //Async Request
         xhr.onreadystatechange = function() {
             if(xhr.readyState === 4 && xhr.status === 200) {
                flight = JSON.parse(xhr.responseText);
                render();
            }
         }
    
    //creating function to get flight details into the web page
    var render = function() {
        arrivalList.innerHTML = '';
        flight.forEach(function(data) {
            
             //creating html elements
            var listItem = document.createElement('li')
            var spanItem1 = document.createElement('span')
            var spanItem2 = document.createElement('span')
            var spanItem3 = document.createElement('span')
            var spanItem4 = document.createElement('span')
             
            //adding   class to <li> and <span>
            listItem.classList.add('list-group-item');
            spanItem1.classList.add('flight-No');
            spanItem2.classList.add('title');
            spanItem3.classList.add('time');
            spanItem4.classList.add('status');
           
            //adding text to span items
            spanItem1.innerText = data.id;
            spanItem2.innerText = data.title;
            spanItem3.innerText = data.time;
            spanItem4.innerText = data.status;
            
            //<span> as child of <li>
            listItem.appendChild(spanItem1);
            listItem.appendChild(spanItem2);
            listItem.appendChild(spanItem3);
            listItem.appendChild(spanItem4);
            
            //adding <li>as child of <ul>
            arrivalList.appendChild(listItem);
    
            //to show the delayed flight in red
                if(data.status =='Delayed'){
                    spanItem4.classList.add('delay');
                }
        });
    }
    
}