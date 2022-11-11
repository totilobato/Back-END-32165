const router = require('express').Router()

const products = require('../storage/products')

router.post('/', async (req, res, next) => {
    try{
        let data = await products.save(req.body)
        res.status(201).render(
            'pages/done',
            {data}
        )
    } catch(err){
        next(err)
    }
})

router.get('new', (req, res) => {
    res.status(200).render('pages/index')
})

router.get('/', async (_req, res, next) => {
    try{
        let data = await products.getAll()
        if (data) {
            res.status(200).render(
                'pages/products',
                {data}
            )
        }else{
            res.status(400).json({
                response: 'not found'
            })
        }
    }catch(err){
        next(err)
    }
})

router.get('/random', async (_req, res, next) => {
    try {
        let data = await products.getRandom()
        if (data) {
            res.status(200).json({
                response: data
            })
        }else {
            res.status(404).json({
                response: 'not found'
            })
        }
    } catch(err) {
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    const { id } = req.params
    try {
        let data = await products.getById(id)
        if (data) {
            res.status(200).json({
                response: data
            })
        }else{
            res.status(404).json({
                response: 'not found'
            })
        }
    } catch(err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    let { id } = req.params
    try {
        let data = await products.putById(id, req.body)
        if (data) {
            res.status(200).json({
                response: data
            })
        }else{
            res.status(404).json({
                response: 'not found'
            })
        }
    } catch(err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        let { id } = await products.deleteById(id)
        if (data) {
            res.status(200).json({
                response: 'product deleted'
            })
        }else{
            res.status(404).json({
                response: 'not found'
            })
        }
    } catch(err) {
        
    }
})

module.exports = router