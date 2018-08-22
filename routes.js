const _ = require('lodash');

function Routes(app, db) {

	const OK_RESPONSE = {
		ok: true
	};

	const get = (req, res) => {
		const method = db.get('delivery_methods')
			.find({
				'method_id': req.params.id
			})
			.value();

		res.send(method);
	};

	app.get('/delivery/:id', get);
	app.post('/delivery/:id', get);

	app.put('/delivery/:id', (req, res) => {
		db.get('delivery_methods')
			.find({
				'method_id': req.params.id
			})
			.assign({
				shifts: (!_.isEmpty(req.body)) ? req.body : []
			})
			.write();

		res.send(OK_RESPONSE);
	});

	app.delete('/delivery/:id', (req, res) => {
		db.get('delivery_methods')
			.remove({
				'method_id': req.params.id
			})
			.write();

		res.send(OK_RESPONSE);
	});

	app.post('/delivery', (req, res) => {
		db.get('delivery_methods')
			.push((!_.isEmpty(req.body)) ? req.body : {})
			.write();

		res.send(OK_RESPONSE);
	});

	app.post('/delivery/mock', (req, res) => {

		let t = req.query.t;
		let error = req.query.error;
		let pac = req.query.pac;

		t = t || 0;
		!!pac ? parseInt(pac) : 10

		let data = {
			'delivery_methods': [{
				'id': '10',
				'eta_days': 5,
				'name': 'PAC',
				'amount': pac
			}, {
				'id': '10',
				'eta_days': 2,
				'name': 'Sedex',
				'amount': 25
			}]
		};

		if (error) {
			data = {
				'errors': [{
					'key': 'Chave',
					'message': 'Mensagem de erro'
				}]
			};
		}

		setTimeout(() => {
			res.json(data);
		}, t);

		//res.json(data);
	});

	app.get('/', (req, res) => {
		res.json(OK_RESPONSE);
	});

}

module.exports = Routes;