import * as mongoose from "mongoose"
const localUrl = 'mongodb://localhost/mydoc'

export class MongooseConnect {
    private url: string
    constructor() {
        this.url = process.env.MONGO_TEST_URI || localUrl
        this.settings()
    }
    private settings(): void {
            mongoose.connect(this.url, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })

            const db = mongoose.connection
            db.on('error', console.error.bind(console, 'Error in database connection: \n'))
            db.once('open', () => {
                console.log('Connection to database established!')
            })
        }
}