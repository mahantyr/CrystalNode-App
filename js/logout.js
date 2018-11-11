function logout () {
	window.localStorage.removeItem('bomtype')
	window.localStorage.removeItem('userid')
	location.href="login.html"
}