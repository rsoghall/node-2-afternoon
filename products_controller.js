module.exports ={
    create: (req, res) => {
        const dbInstance =req.app
        .get('db')
        const{item, product_desc, price, image_url} = req.body

        dbInstance.create_product([item, product_desc, price, image_url])
        .then(()=> {
            res.status(200).send('Product Created!')
        }).catch(err => {
            res.status(500).send({errorMessage: 'You Suck at Creating Product!'},
            console.log(err))
            })
        },
    
    getOne: (req, res) => {
        const dbInstance = req.app
        const {id} =req.params
        .get('db')

        dbInstance.read_product(id)
        .then((product) => {
            res.status(200).send(product)
        }).catch(err => {
            res.status(500).send({errorMessage: 'You Suck at getting a Product!'},
            console.log(err))
        })
       
    },

    getAll: (req, res) => {
        const dbInstance = req.app
        .get('db')
        dbInstance.read_products()
        .then((products) => {
            res.status(200).send(products)
        }).catch(err => {
            res.status(500).send({errorMessage: 'You Suck at getting all the Products!'},
            console.log(err))
        })
    },

    update: (req, res) => {
        const dbInstance = req.app
        const {id} = req.params
        const {desc} = req.query
        .get('db')

        dbInstance.update_product(id, desc)
        .then(() => {
            res.status(200).send()
        }).catch(err => {
            res.status(500).send({errorMessage: 'You Suck at updating Products!'},
            console.log(err))
        })
    },

    delete: (req, res) => {
        const dbInstance = req.app
        const {id} =req.params
        .get('db')

        dbInstance.delete_product(id)
        .then(()=> {
            res.status(200).send()
        }).catch(err => {
            res.status(500).send({errorMessage: 'You Suck at deleting Products!'},
            console.log(err))
        })
    }

    
   
}

module.exports = {
    create: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const {name, description, price, image_url} =req.body;

        dbInstance.create_product([name, description, price, image_url])
        .then(() => res.sendStatus(200) )
        .catch(err => {
            res.status(500).send({errorMessage: 'You Suck at CREATE'},
            console.log (err))
            })
    
       },

    getOne: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const {params} = req;

        dbInstance.read_product(params.id)
        .then(product => res.status(200).send(product) )
        .catch(err => {
            res.status(500).send({errorMessage: 'You Suck at READING!!'},)
            console.log (err)
        })
    },

    getAll: (req, res, next) => {
        const dbInstance = req.app.get('db');

        dbInstance.read_products()
        .then (products => res.status(200).send (products) )
        .catch(err => {
            res.status(500).send({errorMessage: " OOPS!!, You Screwed up READ AGAIN!?!?"},
            console.log(err))
        })
    },

    update: (req, res, next ) => {
        const dbInstance = req.app.get('db');
        const {params, query} = req;

        dbInstance.update_product([params.id, query.desc])
        .then(() => res.status(200))
        .catch(err =>{
            res.status(500).send({errorMessage: 'Permanent Update Failure!!'},
            console.log(err))
        })
    },

    delete: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const {params} = req;

        dbInstance.delete_product(params.id)
        .then( () => res.sendStatus(200) )
        .catch(err => {
            res.status(500).send({errorMessage: 'Delete Failed'},
            console.log(err))
        })
        }
};