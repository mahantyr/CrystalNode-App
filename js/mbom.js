var socket;
$(document).ready(function(){
socket=io("http://localhost:4000")
socket.on('mbom_return',function(msg){
	if(msg.success) {
		alert("done")
				$("#epartno").val("")
				$("#epartname").val("")
				$("#eqty").val("")
				$("#edeadline").val("")
				$("#ematerial").val("")
				$("#especs").val("")
				$("#emanufacture").val("")
				$("#mcom").val("")
				$("#mploc").val("")
				$("#mvcode").val("")
				$("#msob").val("")
				$("#mdloc").val("")
				$("#msp").val("")
				$("#mmod").val("")
	} else {
		alert("Error")
	}
})
socket.on('mbom_data',function(data){
		console.log(data)
		if(data.success) {
		$('#print_partname').empty()
		$('#print_partname').text(data.ebom.partname)
		$('#print_man').empty()
		$('#print_man').text(data.ebom.manufacture)
		$('#print_material').empty()
		$('#print_material').text(data.ebom.material)
		$('#print_qty').empty()
		$('#print_qty').text(data.ebom.qty)
		$('#print_deadline').empty()
		$('#print_deadline').text(data.ebom.deadline)
		$('#print_specs').empty()
		$('#print_specs').text(data.ebom.specs)
		$('#print_partno').empty()
		$('#print_partno').text(data.ebom.part_no)

		$('#print_com').empty()
		$('#print_com').text(data.mbom.com)
		$('#print_dloc').empty()
		$('#print_dloc').text(data.mbom.dloc)
		$('#print_mod').empty()
		$('#print_mod').text(data.mbom.mod)
		$('#print_ploc').empty()
		$('#print_ploc').text(data.mbom.ploc)
		$('#print_sob').empty()
		$('#print_sob').text(data.mbom.sob)
		$('#print_sp').empty()
		$('#print_sp').text(data.mbom.sp)
		$('#print_vcode').empty()
		$('#print_vcode').text(data.mbom.vcode)

	} else {
		alert("false")
	}
	})
})
function submit () {
	var partno=$("#epartno").val()
	var partname=$("#epartname").val()
	var qty=$("#eqty").val()
	var deadline=$("#edeadline").val()
	var material=$("#ematerial").val()
	var specs=$("#especs").val()
	var manufacture=$("#emanufacture").val()
	var com=$("#mcom").val()
	var ploc=$("#mploc").val()
	var vcode=$("#mvcode").val()
	var sob=$("#msob").val()
	var dloc=$("#mdloc").val()
	var sp=$("#msp").val()
	var mod=$("#mmod").val()

	if(partno.length>0 && partname.length>0 && qty.length>0 && deadline.length>0 && material.length>0 && specs.length>0 && manufacture.length>0 && com.length>0 && ploc.length>0 && vcode.length>0 && sob.length>0 && dloc.length>0 && sp.length>0 && mod.length>0) { 
	var newdata={part_no:partno,partname:partname,qty:qty,deadline:deadline,material:material,specs:specs,manufacture:manufacture,com:com,ploc:ploc,vcode:vcode,sob:sob,dloc:dloc,sp:sp,mod:mod};
	socket.emit('mbom_attr',newdata)
} else {
	alert("some box is empty")
}
}

function btn_search_part() {

var value=$("#searchbypart").val()

if(value.length>0) {
	console.log(value)
	socket.emit('read_mbom',{part_no:value})
}
}
