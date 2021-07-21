const fs = require('fs')
const url = fs.readFileSync('./products_urls.json', 'utf8')
const fetch = require('node-fetch');
const HTMLParser = require('node-html-parser');

function get () {
  const data = JSON.parse(url)
	data.map((item) => {
		const url = item
		const http = encodeURI(item)
		const result = {
			data: []
		}
		let text = ''
		let images = []
			fetch(http)
			.then((res) => res.text())
			.then((res) => {
				HTMLParser.parse(res).querySelectorAll('img')
				.map((item) => {
					HTMLParser.parse(res).querySelectorAll('div').map(item => {
						if(item.classNames.includes('product-single__description rte') && item.rawTagName === 'div') {
							
							text = item.rawText.trim()
						}
					})
					if(item.parentNode.rawAttributes.href && item.parentNode.rawAttributes.href !== undefined && item.parentNode.rawAttributes.href !== '/') {
						if(images.some(i => i.imgUrl === `http:${item.parentNode.rawAttributes.href}`)) {
							return
						}	else {
							images.push({ imgUrl:`http:${item.parentNode.rawAttributes.href}` })
						}

						if(!result.data.find(i => i.url === url)) {
							result.data.push({
								url,
								description: text,
								images
							});
						} else {
							const id = result.data.findIndex(i => i.url === url)
							result.data[id].images = images
						}
					} else if(item.parentNode.rawAttributes['data-zoom']){
						if(images.some(i => i.imgUrl === `http:${item.parentNode.rawAttributes['data-zoom']}`)) {
							return
						}	else {
							images.push({ imgUrl:`http:${item.parentNode.rawAttributes['data-zoom']}` })
						}
						String.prototype.re
						if(!result.data.find(i => i.url === url)) {
							result.data.push({
								url,
								description: text,
								images
							});
						} else {
							const id = result.data.findIndex(i => i.url === url)
							result.data[id].images = images
						}
					} else {
						result.data.push({
							url,
							description: text,
							images
						});
					}
				})
			})
			.then(() => {
				let fileContent = fs.readFileSync('result.json', "utf8");
				if (fileContent.length > 0) {
					const data = JSON.parse(fileContent)
					data.data.push(result.data[0])
					fs.writeFileSync('result.json', JSON.stringify(data))
				} else {
					fs.writeFileSync('result.json', JSON.stringify(result));	
				}
			})
			.catch(err => console.log(err))
	})
}

get()