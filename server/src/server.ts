import Fastify from 'fastify'
import cors from '@fastify/cors'
import { prisma } from './lib/prisma'
import { appRoutes } from './routes'

const app = Fastify()
const port = 3000

app.register(cors)
app.register(appRoutes)

app.listen({
    port,
    host: '0.0.0.0'
}).then(() => {
    console.log(`Server running on port ${port}`);
})