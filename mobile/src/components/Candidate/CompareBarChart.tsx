import React from 'react';
import { Bar, BarChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";

interface CompareBarChart {
	data: {
		name: string;
		totalIncome: number;
		totalExpense: number
	}[];
	name: string;
}

const legandMapping: {[key: string]: string} = {
	'totalIncome': '收入',
	'totalExpense': '支出'
}

const renderColorfulLegendText = (value: string, entry: any) => {
	const { color } = entry;
	const text = legandMapping[value];

	return <span style={{ color }}>
		<span style={{color: 'rgba(0, 0, 0, 0.54)', fontSize: '14px'}}>{text}</span>
	</span>;
}

interface BasePaper {
	active?: boolean;
	label?: string;
	payload?: { value: string; totalIncome: number; totalExpense: number }[];
}

const CustomTooltip = ({active, label, payload}: BasePaper) => {
  if (active) {

		// const income = payload ? (Number(payload[0].value) * 10000000).toLocaleString() : 0;
		// const expense = payload ? (Number(payload[1].value) * 10000000).toLocaleString() : 0;

		const income = payload ? (Number(payload[0].value).toFixed(2) + '百萬') : 0;
		const expense = payload ? (Number(payload[1].value).toFixed(2) + '百萬') : 0;
    return (
      <div className="custom-tooltip">
				<p>{label}</p>
        <p className="label">{`收入 : ${income}`}</p>
        <p className="label">{`支出 : ${expense}`}</p>
      </div>
    );
  }

  return null;
};


const CompareBarChart = ({ data, name }: CompareBarChart) => {

	const normalizeData = data.map(val => {
		return {
			name: val.name,
			totalIncome: val.totalIncome / 1000000,
			totalExpense: val.totalExpense / 1000000
		}
	})
	return (
		<>
			<ResponsiveContainer width="100%" height={350}>
				<BarChart
					data={normalizeData}
					margin={{
						top: 40, right: 30, bottom: 20, left: 0,
					}}>

					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis label={{ value: '百萬', angle: 0, position: 'top', offset: 20, fontSize: 14, fill: 'rgba(0, 0, 0, 0.54)' }}/>
					<Tooltip content={<CustomTooltip/>}/>
        	<Legend formatter={renderColorfulLegendText} />
					<Bar dataKey="totalIncome" fill="#3199BA" barSize={17} />
					<Bar dataKey="totalExpense" fill="#D4AF37" barSize={17} />
				</BarChart>
			</ResponsiveContainer>
		</>
	)
}

export default CompareBarChart