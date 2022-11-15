function chequeadorRolAdmin(req, res, next) {
    const rol = req.body.rol
    if(rol == 'admin') {
        next()
    } else {
        res.status(401).send('NO PODES ACCEDER')
    }
}
module.exports = chequeadorRolAdmin()