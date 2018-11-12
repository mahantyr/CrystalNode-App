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
				$("#eopr").val("")
				$("#epro").val("")
	} else {
		alert("Error")
	}
})

	socket.on('ebom_data_full',function(data){
		console.log(data)
		console.log(data.length)
		arr=[]
		for(var i=1;i<=2;i++)
		{
			for(var k=1;k<=2;k++)
			{


			for(var j=0;j<data.length;j++)
			{
				if(data[j].pro==i&&data[j].opr==k)
					arr.push(data[j])
			}
		}
		}
		$("#append_list").empty()
		for(var i=0;i<arr.length;i++) {
			  var list= "<div class='card demo-card-header-pic'>"+
                     "<div class='card-header align-items-flex-end' id='print_partname'>"+arr[i].partname+"</div>"+
                     "<div class='card-content card-content-padding'>"+
                        "<p><u><b>Part No.</u></b></p>"+
                        "<p id='print_partno'>"+arr[i].part_no+"</p>"+
                        '<p><u><b>Part Date</u></b></p>'+
                        '<p class="print_date">'+arr[i].date+'</p>'+
                        '<p><u><b>Manufacturing Type</u></b></p>'+
                        '<p id="print_man">'+arr[i].material+'</p>'+
                        '<p><u><b>Material</u></b></p>'+
                        "<p id='print_material'>"+arr[i].manufacture+"</p>"+
                        '<p><u><b>Quantity</u></b></p>'+
                        "<p id='print_qty'>"+arr[i].qty+"</p>"+
                        '<p><u><b>Deadline</u></b></p>'+
                        "<p id='print_deadline'>"+arr[i].deadline+"</p>"+
                        '<p><u><b>Specification</u></b></p>'+
                        '<p id="print_specs">'+arr[i].specs+'</p>'+
                        '<p><u><b>Operation Number</u></b></p>'+
                        "<p id='print_opr'>"+arr[i].opr+"</p>"+
                        '<p><u><b>Process Number</u></b></p>'+
                        "<p id='print_pro'>"+arr[i].pro+"</p>"+
                      '</div>'
                    
                    
                    $("#append_list").append(list)
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
		$('#print_opr').empty()
		$('#print_opr').text(data.query.opr)
		$('#print_pro').empty()
		$('#print_pro').text(data.query.pro)
		$('.print_date').empty()
		$('.print_date').text(data.query.date)
		$(".eapprove").attr(onclick,"")
		console.log(data.query.status)
		if(data.query.status=='pending') {
			$('.estatus').show()
		} else {
			$('.estatus').hide()
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
		console.log(update)
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
	var opr=$("#eopr").val()
	var pro=$("#epro").val()
	var date= new Date()
	console.log(update)
	if(partno.length>0 & partname.length>0 & qty.length>0 & deadline.length>0 & material.length>0 & specs.length>0 & manufacture.length>0 & opr.length>0 & pro.length>0) { 
	var newdata={part_no:partno,partname:partname,qty:qty,deadline:deadline,material:material,specs:specs,manufacture:manufacture,opr:opr,pro:pro,toUpdate:update,status:false,date:date};
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
socket.emit('read_ebom_full','dummy')
}

function approve_ebom() {
	var id=$('#print_partno').text()
	if(id.length>0) {
	socket.emit('approve_ebom',id)
}
}