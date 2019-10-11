# gyg-node

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 5.0.0-rc.3.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node >= 4.x.x, npm >= 2.x.x
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)
- [SQLite](https://www.sqlite.org/quickstart.html)

### Developing

1. Run `npm install` to install server dependencies.

2. Run `npm start` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `sudo npm run-script build` for building and `sudo pm2 start index.js --name ApplicationName` for preview.

## Testing

Running `npm test` will run the unit tests with karma.

## Mysql relationShip

- [Mysql associations](https://sequelize.org/master/manual/associations.html)

##Make Associations

- sqldb/index.js  

``` 
// Insert models below

db.Thing = db.sequelize.import('../api/model/thing.model');
db.User = db.sequelize.import('../api/model/user.model');
db.Post = db.sequelize.import('../api/model/post.model');
db.Comment = db.sequelize.import('../api/model/comment.model');

db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);
db.Post.hasMany(db.Comment);
db.Comment.belongsTo(db.Post);
    
```
- controller/thing.controller.js

```

return User.findAll({
            include: [{
                model: Post,
                include: [{
                    model: Comment
                }]
            }],
            where: {
                id: 1
            }
        }).then((getAllUsers) => {
            GyGLog.writeLog(GyGLog.eLogLevel.info, uniqueId, `getAllUsers DB: ${JSON.stringify(getAllUsers)}`);
            if (getAllUsers) {
                GyGLog.writeExitLog(GyGLog.eLogLevel.info, uniqueId, methodName, "GET", JSON.stringify(getAllUsers));
                return res.status(httpResponseCode.statusCode.Success).json(getAllUsers);
            }
        }).catch((error) => {
            GyGLog.writeExitLog(GyGLog.eLogLevel.error, uniqueId, methodName, "GET", error.stack.toString());
            next(error);
        });

```


- JOI Validation 

```

addStore: {
        body: {
            days_hours_base: Joi.object({
                service_availability: Joi.array().items(service).required(),
                subtitle: Joi.string().required(),
            }).required(),
            uuid: Joi.string().uuid().required(),
            name: Joi.string().required(),
            has_breakfast: Joi.boolean().required(),
            state: Joi.string().required(),
            menu_id: Joi.string().required(),
        }
    },

```

- service

```

let service = Joi.object().keys({
    enabled: Joi.boolean().required(),
    time_periods: Joi.array().items(timePeriode).required(),
    day_of_week: Joi.string().required()
});

let timePeriode = Joi.object().keys({
    start_time: Joi.string().required(),
    end_time: Joi.string().required()
});

```







