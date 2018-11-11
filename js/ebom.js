var socket,update=false
$(document).ready(function(){
	socket=io("http://localhost:4000")
	socket.on('ebom_return',function(msg){
	if(msg.success) {
		alert("done")
				$("#epartno").val("")
				$("#epartname").val("")
				$("#eqty").val("")
				$("#edeadline").val("")
				$("#ematerial").val("")
				$("#especs").val("")
				$("#emanufacture").val("")
	} else {
		alert("Error")
	}
})
	socket.on('ebom_data',function(data){
		console.log(data)
		if(data.success) {
		$('#print_partname').empty()
		$('#print_partname').text(data.query.partname)
		$('#print_man').empty()
		$('#print_man').text(data.query.manufacture)
		$('#print_material').empty()
		$('#print_material').text(data.query.material)
		$('#print_qty').empty()
		$('#print_qty').text(data.query.qty)
		$('#print_deadline').empty()
		$('#print_deadline').text(data.query.deadline)
		$('#print_specs').empty()
		$('#print_specs').text(data.query.specs)
		$('#print_partno').empty()
		$('#print_partno').text(data.query.part_no)
		$(".eapprove").attr(onclick,"")
		if(data.query.status=='pending') {
			$('.estatus').show()
		}
		//$(".eapprove").attr(onclick,"approve_ebom(\""+data.query.partno+"\")")

	} else {
		alert("false")
	}
	})

	$(".eupdate").click(function(){
		var partname=$('#print_partname').text()
		var partno=$('#print_partno').text()
		if(partname.length >0 & partno.length>0) { 
		$("#epartno").val(partno)
		$("#epartname").val(partname)
		update=true
		$(".add_new")[0].click()
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
	var date= new Date()
	if(partno.length>0 & partname.length>0 & qty.length>0 & deadline.length>0 & material.length>0 & specs.length>0 & manufacture.length>0) { 
	var newdata={part_no:partno,partname:partname,qty:qty,deadline:deadline,material:material,specs:specs,manufacture:manufacture,toUpdate:update,status:false,date:date};
	socket.emit('ebom_attr',newdata)
	update=false
} else {
	alert("some box is empty")
}
}

function btn_search_part() {

var value=$("#searchbypart").val()

if(value.length>0) {
	console.log(value)
	socket.emit('read_ebom',{part_no:value})
}
}

function approve_ebom() {
	var id=$('#print_partno').text()
	if(id.length>0) {
	socket.emit('approve_ebom',id)
}
}