/**
 * @description user api test
 * @author 前端小菜鸟吖
 */
const server = require('../server')

// 用户信息
const username = `u_${Date.now()}`
const password = `p_${Date.now()}`
const email = 'raomaiping@gmail.com'
const testUser = {
    username,
    email,
    password,
    nickName: username,
    gender: 1,
}
// 存储 cookie
let COOKIE = ''

// 注册
test('注册一个用户，应该成功', async () => {
    const res = await server.post('/api/user/register').send(testUser)
    expect(res.body.errno).toBe(0)
})

// 重复注册
test('重复注册用户，应该失败', async () => {
    const res = await server.post('/api/user/register').send(testUser)
    expect(res.body.errno).not.toBe(0)
})

// 查询用户是否存在
test('查询注册的用户名，应该存在', async () => {
    const res = await server.post('/api/user/isExist').send({ username })
    expect(res.body.errno).toBe(0)
})

// json schema 检测
test('json schema 检测，非法的格式，注册应该失败', async () => {
    const res = await server.post('/api/user/register').send({
        userName: '123', // 用户名不是字母(或下划线)开头
        password: 'a', // 最小长度不是3
        email: 'a',
        //nickName:'',
        gender: 'mail', //不是数字
    })
    expect(res.body.errno).not.toBe(0)
})
// 登录
test('登录，应该成功', async () => {
    const res = await server.post('/api/user/login').send({
        username,
        password,
    })
    expect(res.body.errno).toBe(0)
    // 获取 cookie
    COOKIE = res.header['set-cookie'].join(';')
})

// 修改基本信息
test('修改基本信息应该成功', async () => {
    const res = await server
        .patch('/api/user/changeInfo')
        .send({
            nickName: '测试昵称',
            city: '测试城市',
            picture: '/test.png',
            email: 'raoaaamaiping@gmail.com',
            gender: 1,
            github: 'https://github.com/raomaiping',
            juejin: 'https://juejin.cn/user/588993965598407',
            qq: '2582395486',
            wx: '15979580504',
        })
        .set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
})
