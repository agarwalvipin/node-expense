
google.load("visualization", "1", {
	packages: ["corechart"]
});
google.setOnLoadCallback(drawChart);

function drawChart() {

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