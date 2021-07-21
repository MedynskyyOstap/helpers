const axios = require('axios');
const { INSPECT_MAX_BYTES } = require('buffer');
const cors = require('cors');
const { json3 } = require('express');
const express = require('express');
const fs = require('fs');
const server = express();
const moment = require('moment');

server.use(cors);

const port = 5000;
const host = 'localhost'

async function start (req, res) {
	try {
		const { data } = await axios.get('https://promotool.dermpro.com/v1/library?limit=2500');
		const { templates } = await data;
		console.log(templates.length)
		const result = await templates.map((i, index) => {
			// return {
			// 	libraryID: i._id,
			// 	libraryName: i.libraryName,
			// 	salesRules: i.salesRules,
			// 	store: i.store,
			// 	typeCode: i.typeCode,
			// 	labelsEvents: i.labelsEvents,
			// 	labelsGenerals: i.labelsGenerals,
			// 	labelsManufactures: i.labelsManufactures,
			// }
			return {
				libraryID: i._id,
				libraryName: i.libraryName,
				startDate:  i.startDate,
        endDate: i.endDate
			}
		});
		const res = result.sort((a,b) => new Date(a.startDate) - new Date(b.startDate));
		fs.writeFileSync('libraryByDate.json', JSON.stringify(res));
		// const n = 50;
		// new Array(Math.ceil(result.length / n)).fill().map((_, index) => fs.writeFileSync(`library${index}.json`, JSON.stringify(result.splice(0, n))));
		// json3
	} catch (error) {
		console.log(error)
	}
};

start();

server.listen(port, host, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${port}`)
});
