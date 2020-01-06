import Mock from 'mockjs'
const mock = Mock.mock

const list = []
for (let i = 0; i < 100; i++) {
    const template = mock({
        'id': i+1,
        username: '@cname',
        'sex|0-1': 1,
        address: '@county(true)'
    })
    list.push(template)
}

export default {
    'GET /api/user': {
        username: 'admin',
        sex: 5,
    },
    'GET /api/list': function (req, res) {
        let query = req.query || {};
        let {offset,limit} = query
        offset = Number(offset)
        limit = Number(limit)
        let total = list.length
        let len = total / limit
        let totalPages = len - parseInt(len) > 0 ? parseInt(len) + 1 : len
        let newDataList = list.slice(offset-1, offset + limit-1)
        return res.json({
            limit: limit,
            offset: offset,
            list:newDataList,
            len,
            total,
            totalPages
        })
    },
    'GET /api/userinfo/:id': (req, res) => {
        return res.json({
            id: req.params.id,
            username: 'kenny',
        });
    },
    'POST /api/login/account': (req, res) => {
        const { password, username } = req.body;
        if (password === '888888' && username === 'admin') {
            return res.json({
                status: 'ok',
                token: 'sdfsdfsdfdsf',
            });
        } else {
            return res.json({
                status: 'error',
                code: 403,
            });
        }
    },
    'DELETE /api/user/:id': (req, res) => {
        // console.log(req.params.id);
        res.send({ status: 'ok', message: 'delete success!' });
    },
    'PUT /api/user/:id': (req, res) => {
        // console.log(req.params.id);
        // console.log(req.body);
        res.send({ status: 'ok', message: 'update success！' });
    },
}
