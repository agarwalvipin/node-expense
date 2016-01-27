google.load("visualization", "1", {
	packages: ["corechart"]
});

function getFullChartingData() {
	var tr = document.getElementsByTagName('tr');
	var tot = 0;
	var chartData = {}
	for (var i = 1; i < tr.length; i++) {
		var trnode = tr[i];
		var data = trnode.getElementsByTagName('td');

		var tkey = data[4].textContent;
		var tval = parseFloat(data[1].textContent);
		
		if (chartData[tkey] === undefined)
			chartData[tkey] = tval;
		else
			chartData[tkey] += tval;

	}

	console.log(chartData);
	console.log(typeof(chartData));
	return chartData;
}


function drawChart() {

	//google.setOnLoadCallback(drawChart);
	var chartData = getFullChartingData();
	var data = new google.visualization.DataTable();
	data.addColumn('string','Category');
	data.addColumn('number','Total');
	
	for( item in chartData){
		data.addRow([item, chartData[item]])
	}
	
	var options = {
		title: 'My Expense Chart'
	};

	var chart = new google.visualization.PieChart(document.getElementById('piechart'));

	chart.draw(data, options);
}

function getTotalTillDate()
{
	var tr = document.getElementsByTagName('tr');
	var tot = 0;

	for( var i =2; i < tr.length; i++){
	  var trnode = tr[i];
	  var data = trnode.getElementsByTagName('td');
	  tot += parseFloat(data[1].textContent);
	}

	return tot;
}

function createDetailsbyDivId(divId, tot, comment)
{
	var totDetailsDivElem = document.getElementById(divId);
	var totDetailsElem = document.createElement("p")
	totDetailsDivElem.appendChild(totDetailsElem);
	totDetailsElem.innerHTML = comment + tot;
}

function getTotalExpensesForCurrentMonth()
{
/*
	<tr>
		<th>ID</th>
		<th>Amount</th>
		<th>Date</th>
		<th>Description</th>
		<th>Category</th>
		<th>Timestamp</th>
	</tr>
*/
	var today = new Date();
	var tr = document.getElementsByTagName('tr');
	var tot = 0;

	for( var i =2; i < tr.length; i++){
	  var trnode = tr[i];
	  var data = trnode.getElementsByTagName('td');
	  
	  var amt = parseFloat(data[1].textContent);
	  var date = new Date(data[2].textContent);
		
	  if(date.getFullYear() == today.getFullYear()
		&& date.getMonth() == today.getMonth())
	  		tot += amt;
	}

	return tot;
}

function submitNewEntry(){
	var http = new XMLHttpRequest();
	var url = "AddEntry";
	var dt = new Date();
	
	var params = "amt=" + document.forms[0].amt.value  +"&date=" + document.forms[0].date.value +"&description=" + document.forms[0].description.value	+"&category=" +  document.forms[0].category.value
	
	http.open("POST", url);

	//Send the proper header information along with the request
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.setRequestHeader("Content-length", params.length);
	//http.setRequestHeader("Connection", "close");

	http.onreadystatechange = function() {//Call a function when the state changes.
		if(http.readyState == 4 && http.status == 200) {
			//document.getElementById('formSubmitResponseStatus').innerHTML = http.responseText;
			alert(http.responseText);
		}
	}
	http.send(params);
	return;
}

function validate(){
		console.log("inside validat");
		if(document.getElementById("amt").value <= 0){
			//document.getElementById('formSubmitResponseStatus').innerHTML = "Validation FAILED!!";
			alert("Validation Failed!!");
			document.forms[0].reset();
			return false;
		}
		else{
			submitNewEntry();
			console.log('Sending a submit');
			return false;
		}
	}

function getAllEntries(){
	var request = new XMLHttpRequest();
	console.log('Firing Ajax')
	request.open('GET','http://localhost:3000/GetAll');
	request.send();


/*if( request.status === 200){
	console.log(request);
	document.writeln(document.responseText);
	var divElem = document.getElementById('all');
	divElem.innerHTML = request.responseText;
}*/

	request.onreadystatechange = function(){
		if (request.status=== 200 && request.readyState ===4){
			//console.log('got response');
			//var divElem = document.getElementById('all');
			//divElem.innerHTML = request.responseText;
			return request.responseText;
		}
	}
}

function delRecord(id)
{
	
}

function buildEntryTable(){
	if(document.getElementById('entryTableData')){
		
		var request = new XMLHttpRequest();
		console.log('Firing Ajax')
		request.open('GET','http://localhost:3000/GetAll');
		request.send();
		
		request.onreadystatechange = function(){
			if (request.status=== 200 && request.readyState ===4){
				var data ="";
				
				var arr = JSON.parse(request.responseText);
				var elements = ['id','amt','date','description','category','timestamp'];
				
					for(var o = 0 ; o < arr.length; o++){
						var td;
						var tr = document.createElement('tr');
						
						for (var j=0; j<elements.length; j++){
							td = document.createElement('td');
							td.innerHTML=arr[o][elements[j]];
							tr.appendChild(td);
						}
						td = document.createElement('td');
						
						
						var createEditElem = document.createElement('a');
							createEditElem.setAttribute('href', "#");
						var spanElem = document.createElement('span');
							spanElem.setAttribute('class',"glyphicon glyphicon-edit")
						createEditElem.appendChild(spanElem);
						td.appendChild(createEditElem);
						
						var deleteRecordElem = document.createElement('a');
						//var delLink = "http://localhost:3000/DelEntry/"+ arr[o]['id'];

							deleteRecordElem.setAttribute('href', delRecord(arr[o]['id']));
						var spanElemB = document.createElement('span');
							spanElemB.setAttribute('class',"glyphicon glyphicon-remove");
						deleteRecordElem.appendChild(spanElemB);
						td.appendChild(deleteRecordElem);
						
						tr.appendChild(td);
						
/*						data 	+= "<tr>";
						data 	+= "<td>" + arr[o]['id'] 	+ "</td>";
						data 	+= "<td>" + arr[o]['amt'] 	+ "</td>";
						data 	+= "<td>" + arr[o]['date']	+ "</td>";
						data 	+= "<td>" + arr[o]['description'] + "</td>";
						data 	+= "<td>" + arr[o]['category'] 	+ "</td>";
						data 	+= "<td>" + arr[o]['timestamp'] + "</td>";
						data 	+= "<td><a href=\"#\"><span class=\"glyphicon glyphicon-edit\"></span></a><a href=\"#\"><span class=\"glyphicon glyphicon-remove\"></span></a></td>";
						data 	+= "</tr>";*/
						
						document.getElementById('entryTableData').appendChild(tr);
					}
			createDetailsbyDivId("Details", getTotalTillDate(),"Total Expense Till Date: ");
			createDetailsbyDivId("Details", getTotalExpensesForCurrentMonth(),"Current Month Expense: ");
			drawChart();
			}
		}
	}
}

window.onload = function(){
	buildEntryTable();
}