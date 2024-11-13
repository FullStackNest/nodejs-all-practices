function GetData(req, res) {
    res.json({
        status: 200,
        data: [
            {
                id: 1,
                name: 'Satyaprakash'
            },
            {
                id: 2,
                name: 'Hapi Sahoo'
            }
        ]
    })
}

function IndexPath(req, res) {
    res.send('Hello World')
}

function PostsPath(req, res) {
    res.send(`This is Posts Page for ${req.params.id}`)
}

module.exports = {
    GetData,
    IndexPath,
    PostsPath,
}