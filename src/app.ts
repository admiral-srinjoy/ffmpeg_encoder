
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as pinoModule from 'express-pino-logger'
import * as path from 'path'
import IndexRouter from './routes/index'
import WorkflowStatusRouter from './routes/workflow-status'
const pino = pinoModule()

// Creates and configures an ExpressJS web server.
class App {

    // ref to Express instance
    public express = express()

    // Run configuration methods on the Express instance.
    constructor() {
        this.middleware()
        this.routes()
    }
    // app.set('views', path.join(__dirname, 'client/views'));
    // app.set('view engine', 'pug');

    // // uncomment after placing your favicon in /public
    // //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    // app.use(logger('dev'));
    // app.use(bodyParser.json());
    // app.use(bodyParser.urlencoded({ extended: false }));
    // app.use(cookieParser());
    // app.use(express.static(path.join(__dirname, 'client/public')));
    // app.use(express.static(path.join(__dirname, 'bower_components')));
    // Configure Express middleware.
    private middleware() {
        this.express.set('views', path.join(__dirname, '../client/views'))
        this.express.set('view engine', 'pug')
        this.express.use(bodyParser.json())
        this.express.use(bodyParser.urlencoded({
            extended: false
        }))
        this.express.use(cookieParser())
        this.express.use(express.static(path.join(__dirname, '../client/public')))
        this.express.use(express.static(path.join(__dirname, '../bower_components')))
    }

    // Configure API endpoints.
    private routes() {
        const router = express.Router()
        // placeholder route handler
        router.get('/', async (req, res, next) => {
            res.json({
                message: 'Demo encoder'
            })
        })

        // Routes into application
        this.express.use('/', IndexRouter)
        this.express.use('/status', WorkflowStatusRouter)
        this.express.use('/test', router)
    }
}

export default new App().express
