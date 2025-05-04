import { useEffect, useState } from 'react';
import { Button, Col } from 'antd';
import Card from '../components/Card.tsx';
import CakegradeGraph from '../graphs/CakegradeGraph.tsx';
import AnimationTable from '../tables/AnimationTable.tsx';
import BatchProductionTable from '../tables/BatchProductionTable.tsx';
import ImpactingCenterlinesTable from '../tables/ImpactingCenterlinesTable.tsx';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import React from 'react';
function Model() {
	const [activeButton, setActiveButton] = useState<string>('admix'); // Default active button

	const handleButtonClick = (key: string) => {
		// window.open("https://hyd-analytics01.int.pg.com/", "_blank");
	};
	const isLargeScreen = useMediaQuery({ query: '(min-width: 2560px)' });
	

	const fontSize = isLargeScreen ? 35 : 20;
	const buttonStyle = {
		padding: isLargeScreen ? '5px 10px' : '5px 5px',
		color: '#ffffff',
		marginRight: '10px',
	};

		//testing
	const [cakeGradeResult, setCakeGradeResult] = useState([]);
const [batchResult, setBatchResult] = useState([]);
// const [AllData, setAllData] = useState([]);
const [modeResult, setModeResult] = useState(null);
const [loading, setLoading] = useState(true);

// const fetchData = async () => {
// 	try {
// 		setLoading(true);
// 		console.log('Fetching data...');




// 		// Fetch All data
// 		const allDataResponse = await fetch(
// 			`/frontend/frontend/api/get-all-data`
// 		);

// 		const allDataParsed = await allDataResponse.json()
// 		setAllData(allDataParsed);
		
			
// 	} catch (error) {
// 		console.error('Error fetching data:', error);
// 	} finally {
// 		setLoading(false);
// 	}
	// };
	
interface DataItem {
  QCAKE_GRADE: string | number;
  QACBASE_QTY: number;
  QSALT_QTY: number;
  batch_num: string;
  time: string;
  Qsense_closedLoop: number;
}
const AllData: DataItem[] = [
  {
    QCAKE_GRADE: 98.5,
    QACBASE_QTY: 245.32,
    QSALT_QTY: 12.45,
    batch_num: "B123456",
    time: "2024-03-20T14:30:00",
    Qsense_closedLoop: 1
  },
  {
    QCAKE_GRADE: 97.8,
    QACBASE_QTY: 242.18,
    QSALT_QTY: 12.38,
    batch_num: "B123455",
    time: "2024-03-20T14:25:00",
    Qsense_closedLoop: 1
  },
  {
    QCAKE_GRADE: 97.2,
    QACBASE_QTY: 240.95,
    QSALT_QTY: 12.31,
    batch_num: "B123454",
    time: "2024-03-20T14:20:00",
    Qsense_closedLoop: 0
  }
];
	
// timer to fetch data every 20 seconds

// useEffect(() => {
// 	fetchData();
// 	const loopInterval = setInterval(fetchData, 20000);
// 	return () => clearInterval(loopInterval);
// }, []);



	//

	return (
		<>
			<div className="flex flex-col py-2 px-14 largescreen:px-28 gap-8 largescreen:gap-14  w-[100vw] ">
				<div className="flex  ">
					<div className=" button absolute left-[44.5%]  top-[7vh]  flex items-center gap-0 justify-center">
						<Link
							className={`border-2 largescreen:border-4 ${activeButton === 'agglo' ? 'border-white' : 'border-[#153d78]'} rounded-md largescreen:rounded-xl`}
							type={activeButton === 'agglo' ? 'primary' : 'default'}
							onClick={() => handleButtonClick('agglo')}
							style={buttonStyle} to={''}>
							Agglo
						</Link>
						<Link
							className={`border-2 largescreen:border-4 ${activeButton === 'admix' ? 'border-white' : 'border-[#153d78]'} rounded-md largescreen:rounded-xl`}
							type={activeButton === 'admix' ? 'primary' : 'default'}
							onClick={() => handleButtonClick('admix')}
							style={buttonStyle} to={''}>
							Admix
						</Link>
					</div>
				</div>
				{activeButton === 'admix' ? (
					<>
						<div className="flex flex-col gap-8 largescreen:gap-14">
							<div className=" flex flex-col gap-8 largescreen:gap-14  h-[55vh]  ">
								<div className="flex gap-8 largescreen:gap-14 h-4/6  ">
									<Card>
										{AllData.length > 0 ? (
											<BatchProductionTable batchResult={AllData} />
										) : (
											<p>Loading Batch Production Data...</p>
										)}
									</Card>
									<Card>
										<ImpactingCenterlinesTable />
									</Card>
								</div>
								<div className=" h-2/6 ">
									{AllData.length>0? (
										<AnimationTable
											data={AllData}
										/>
									) : (
										<p>Loading Animation Data...</p>
									)}
								</div>
							</div>
							<div className="graph h-[25vh] ">
								<Card>
									<div className="flex relative">
										<h1 className="mx-auto">Cakegrade Trend Analysis (kgF)</h1>
									</div>
									{AllData.length > 0 ? (
										<CakegradeGraph cakeGradeResult={AllData} />
									) : (
										<p>Loading Cake Grade Data...</p>
									)}
								</Card>
							</div>
						</div>
					</>
				) : (
					<>
						<div className="graph  h-[30vh] ">
							<Card>
								<div className="flex relative">
									<h1 className="mx-auto">Cakegrade Trend Analysis (kgF)</h1>
								</div>

								<CakegradeGraph cakeGradeResult={undefined} />
							</Card>
						</div>
						<div className="tables flex gap-5 pt-5 h-[41vh]">
							<div className="table h-full w-full">
								<Card>
									<BatchProductionTable batchResult={undefined} />
								</Card>
							</div>
						</div>
					</>
				)}
			</div>
		</>
	);
}

export default Model;
