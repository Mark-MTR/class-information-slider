function updateClock() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var time = hours + ':' + minutes;
    document.getElementById('clock')。textContent = time;
}
setInterval(updateClock, 1000);
updateClock();
