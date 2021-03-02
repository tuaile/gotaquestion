import { LineChart} from 'react-chartkick'
import 'chart.js'
import React, { useState, useEffect } from 'react';


export function Graph() {
		const [graphdata, setGraphdata] = useState({})
	    useEffect(() => {
		    fetch('http://localhost/gotaquestion/api/api.php?action=viewgraph', {
		        method: 'POST',
		        credentials: 'include'
		    })
		    .then(function (response) {
		        response.json().then(async function (data) {
		            setGraphdata(data);
		        })
		    })
	    }, [])
	return (
		<>
		<LineChart colors={["#bb86fc"]} fontColor={["blue"]} data={graphdata}/>
		</>
	)
}
