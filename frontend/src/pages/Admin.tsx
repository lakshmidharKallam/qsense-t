import { useEffect, useState } from 'react';
import Card from '../components/Card.tsx';

import AuditTable from '../tables/AuditTable.tsx';
import React from 'react';

function Admin(): JSX.Element {


	const [updated , setUpdated] = useState<boolean>(false)

	return (
		<>
			<div className="flex flex-col py-6  px-14 largescreen:px-28 w-[100vw]  gap-8 largescreen:gap-14">
				<div className="Tables flex flex-col h-full">
					<div className="Table   ">
						<Card>
							<h1>Audit</h1>
							<AuditTable updated={updated} />
						</Card>
					</div>
				</div>
			</div>
		</>
	);
}

export default Admin;
