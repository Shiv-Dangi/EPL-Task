import React, { PureComponent } from 'react';
import ReactHighcharts from 'react-highcharts';
import HighChartsMore from 'highcharts-more';

HighChartsMore(ReactHighcharts.Highcharts);

class BubbleChart extends PureComponent {
	getChartData() {
		let { summary } = this.props,
			chartData = [];
		for (let key in summary) {
			let teamData = summary[key];
			chartData.push({
				x: teamData.lost || 0,
				y: teamData.won || 0,
				z: teamData.totalMatches || 0,
				w: teamData.ties || 0,
				code: teamData.team.code,
				name: teamData.team.name
			});
		}
		return chartData;
	}

	render() {
		let { summary } = this.props;
		if (summary && Object.keys(summary).length) {
			const config = {
				chart: {
					type: 'bubble',
					plotBorderWidth: 1,
					zoomType: 'xy'
				},

				title: {
					text: 'EPL Season 2011-12'
				},

				xAxis: {
					gridLineWidth: 1,
					title: {
						text: 'Matches Lost in the season'
					},
					plotLines: [
						{
							color: 'black',
							dashStyle: 'dot',
							width: 2,
							value: 65,
							zIndex: 3
						}
					]
				},

				yAxis: {
					startOnTick: false,
					endOnTick: false,
					title: {
						text: 'Matches won in the season'
					},
					maxPadding: 0.2,
					plotLines: [
						{
							color: 'black',
							dashStyle: 'dot',
							width: 2,
							value: 60,
							zIndex: 3
						}
					]
				},

				tooltip: {
					useHTML: true,
					headerFormat: '<table>',
					pointFormat:
						'<tr><th colspan="2"><h3>{point.name}</h3></th></tr>' +
						'<tr><th>Match Played:</th><td>{point.z}</td></tr>' +
						'<tr><th>Match Won:</th><td>{point.y}</td></tr>' +
						'<tr><th>Match Lost:</th><td>{point.x}</td></tr>' +
						'<tr><th>Match tied:</th><td>{point.w}</td></tr>',
					footerFormat: '</table>',
					followPointer: true
				},

				plotOptions: {
					series: {
						dataLabels: {
							enabled: true,
							format: '{point.code}'
						}
					}
				},

				series: [
					{
						data: this.getChartData()
					}
				]
			};
			return (
				<div className=''>
					<ReactHighcharts config={config} ref='bubble-chart' />
				</div>
			);
		} else {
			return <div>loading...</div>;
		}
	}
}

export default BubbleChart;
