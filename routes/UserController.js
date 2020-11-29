export default (x, User) => {
    const router = x.Router();
    router
    .route('/')
    .get(async r => {
        const users = await User.find();
        r.res.locals.usersTitle = 'Список пользователей';
        r.res.format({
            'application/json': () => r.res.json(users), 
            'text/html': () => r.res.render('users', { users })  
        });    
    })
    .post(async r => {
        const { login, password } = r.body;
        const newUser = new User({ login, password });
        try {
            await newUser.save();
            r.res.status(201).json({'Добавлено: ': login});
        } catch (e) {
            r.res.status(400).json({'Ошибка: ': 'Нет пароля!'});
        }
    });

    router
    .route('/:login')    
    .get(async r => {
        const { login } = r.params;
        r.res.json(await User.find({ login }));
    }) 
    return router;
};