import Card from '../components/Card.tsx';
import CostAnalysisGraph from '../graphs/CostAnalysisGraph.tsx';
import CloseLoopTimeGraph from '../graphs/CloseLoopTimeGraph.tsx';
import { CSVLink } from 'react-csv';
import {
	ClockCircleFilled,
	ClockCircleOutlined,
	ClockCircleTwoTone,
	DollarOutlined,
	DollarTwoTone,
} from '@ant-design/icons';
import React from 'react';

function Savings(): JSX.Element {
	return (
		<>
			<div className="flex flex-row py-6  px-14 largescreen:px-28 w-[100vw] gap-8 largescreen:gap-14 ">
				<div className="graphs flex flex-col gap-8 largescreen:gap-14 w-full">
					<div className="graph h-[41vh]   ">
						<Card>
							<h1 className=" text-center">
								Comparative analysis of Static and Optimised Cost per month
							</h1>
							<CostAnalysisGraph />
						</Card>
					</div>
					<div className="graph h-[41vh]  ">
						<Card>
							<h1 className="text-center">Closed Loop Utilisation Analysis</h1>
							<CloseLoopTimeGraph />
						</Card>
					</div>
				</div>

			</div>
		</>
	);
}

export default Savings;
