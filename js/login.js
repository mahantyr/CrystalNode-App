
var goBack=0,mobile_no=0

$(document).ready(function(){
  $(".sign").click(function(){
  	console.log('called')
  	var userid=$("#userid").val()
    var password=$("#password").val()

  	if((userid).length>0 & (password).length>0) {
      loginUser(userid,password)
  	} else {
      appendMsg("UserId and password is not valid")
    }
  })

    $('.backToFront').click(function(){
      onBackKeyDown()

    })

})
function appendMsg(text) {
	$(".message").empty()
  	$(".message").append(text)
}

function onBackKeyDown() {
  window.plugins.appMinimize.minimize();
}
 
function loginUser(userid,password) {
        console.log("sds")
        url="http://localhost:4000"
        $.ajax({
        type:'post',
        url:url,
        crossOrigin:true,
        data:{userid:userid,password:password},
        dataType:'json',
        beforeSend:function() {
          appendMsg('Validating userid and password..')
          $("#userid").attr('disabled','disabled')
          $("#password").attr('disabled','disabled')
          $(".sign").attr('disabled','disabled')
        },
        success:function(data){
          console.log(data.type)
          $(".sign").removeAttr('disabled')
          $("#userid").removeAttr('disabled')
          $("#password").removeAttr('disabled')
          if(data.success) {
            appendMsg('<center><b>Signing in</b></center>')
            window.localStorage.setItem('userid',data.userid)
            window.localStorage.setItem('bomtype',data.type)
            if(data.type=='ebom') {
              window.location.href='ebom.html'
            } else {
              window.location.href='mbom.html'
            }
          }
          else {
            appendMsg('Incorrect userid and password!!!!')

          }
        },
        failed:function(da) {
          console.log(da)
        }

      })
}