function Routes(app, db) {

	app.post('/delivery/:id', (req, res) => {
		const method = db.get('delivery_methods')
			.find({
				id: req.params.id
			})
			.value();

		res.send(method);
	});

	app.post('/delivery', (req, res) => {

		let t = req.query.t;
		let error = req.query.error;
		let pac = req.query.pac;

		t = t || 0;
		!!pac ? parseInt(pac) : 10

		let data = {
			"delivery_methods": [{
				"id": "10",
				"eta_days": 5,
				"name": "PAC",
				"amount": pac
			}, {
				"id": "10",
				"eta_days": 2,
				"name": "Sedex",
				"amount": 25
			}]
		};

		if (error) {
			data = {
				"errors": [{
					"key": "Chave",
					"message": "Mensagem de erro"
				}]
			};
		}

		setTimeout(() => {
			res.json(data);
		}, t);

		//res.json(data);
	});

	app.get('/', (req, res) => {
		res.json({
			ok: true
		});
	});

}

module.exports = Routes;