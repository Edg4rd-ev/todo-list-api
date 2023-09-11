import express, { Request, Response } from 'express'
import TaskRouter from './router/Task.routes'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
const port = process.env.PORT

app.use((req: Request, res: Response, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
  next()
})

app.use(cors())
app.use(express.json())
app.get('/', (req: Request, res: Response) => {
  return res.send({ msg: 'online e metendo!' })
})
app.use('/api/v1/task', TaskRouter)

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})
