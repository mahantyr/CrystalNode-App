/*function logout () {
	window.localStorage.removeItem('bomtype')
	window.localStorage.removeItem('userid')
	location.href="login.html"
}*/

function logout () {
	window.localStorage.removeItem('bomtype')
	window.localStorage.removeItem('userid')
	location.href="login.html"
}
$(document).ready(function(){
	setInterval(function(){
		if(!localStorage.getItem('bomtype') || !localStorage.getItem('userid')) {
				location.href="login.html"			
		}
	},500)
})