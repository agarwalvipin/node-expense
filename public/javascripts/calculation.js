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

function getTotalTillDate()
{
	var tr = document.getElementsByTagName('tr');
	var tot = 0;

	for( var i =1; i < tr.length; i++){
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

	for( var i =1; i < tr.length; i++){
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

/*function displayChartingData(chartData){
	var totDetailsDivElem = document.getElementById(divId);
	var totDetailsElem = document.createElement("p")
	totDetailsDivElem.appendChild(totDetailsElem);
	totDetailsElem.innerHTML = chartData;
}*/
window.onload = function(){
	createDetailsbyDivId("Details", getTotalTillDate(),"Total Expense Till Date: ");
	createDetailsbyDivId("Details", getTotalExpensesForCurrentMonth(),"Current Month Expense: ");
	//displayChartingData("Details", getFullChartingData());
}