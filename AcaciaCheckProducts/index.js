const fs = require('fs');
const productsData = fs.readFileSync('./productsData.json', 'utf8');
const promotionsData = fs.readFileSync('./promotions.json', 'utf8');
const libraryData = fs.readFileSync('./library.json', 'utf-8');
const storeData = fs.readFileSync('./store.json', 'utf-8');
const { default: axios } = require('axios');
const cors = require('cors');
const productsSku = JSON.parse(productsData).items.map((i) => i.sku);
const { promotions } = JSON.parse(promotionsData);
const { templates } = JSON.parse(libraryData);
const { stores, env } = JSON.parse(storeData);

// const resultPromo = promotions.map((i) => { 
// 	if (i.skus.every((x) => productsSku.includes(x.sku)) && i.skus.length > 0) {
// 		return { ...i}
// 	}}).filter((y) => y !== undefined).map((i) => {
// 		return {...i,
// 			store: stores,
// 			publishedData: { ...i.publishedData, storeCode: stores.code, env },
// 			storeCode: stores.code,
// 			storeName: stores.name,
// 			environment: env
// 		}
// 	});
// 	resultPromo.map((i) => axios.post('https://promotool-acaciaspa.dermpro.com/v1/promotions', i, {
// 		headers: {
// 			'Content-Type': 'application/json',
//       'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGJlNjg2MmRlZDNiMzAwM2I1NmUwYWUiLCJlbWFpbCI6ImFjYWNpYV9wcm9tb0BtYWlsaW5hdG9yLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYyMzM5NjI3NiwiZXhwIjoxNjIzNDgyNjc2fQ.vQ_rfgzrUmX8VnBhFZIwoBGFNLcWum6s_xAgubG1nnk'
// 		}})
// 		.then((res) => console.log(res))
// 		.catch((err) => console.log(err))
// 	);
const resultLibrary = templates.map((i) => { 
	if (i.skus.every((x) => productsSku.includes(x.sku)) && i.skus.length > 0) {
		return { ...i}
	}}).filter((y) => y !== undefined).map((i) => {
		return {...i,
			store: stores,
			publishedData: { ...i.publishedData, storeCode: stores.code, env },
			storeCode: stores.code,
			storeName: stores.name,
			environment: env
		}
	});

resultLibrary.map((i) => axios.post('https://promotool-acaciaspa.dermpro.com/v1//library', i, {
		headers: {
			'Content-Type': 'application/json',
      'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGJlNjg2MmRlZDNiMzAwM2I1NmUwYWUiLCJlbWFpbCI6ImFjYWNpYV9wcm9tb0BtYWlsaW5hdG9yLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYyMzM5NjI3NiwiZXhwIjoxNjIzNDgyNjc2fQ.vQ_rfgzrUmX8VnBhFZIwoBGFNLcWum6s_xAgubG1nnk'
		}})
		.then((res) => console.log(res))
		.catch((err) => console.log(err))
	);

// fs.writeFileSync('resultLibrary.json', JSON.stringify(resultLibrary));
// fs.writeFileSync('resultPromo.json', JSON.stringify(resultPromo));
