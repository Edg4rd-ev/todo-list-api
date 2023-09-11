import { body } from 'express-validator'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const registerTaskValidation = [
  body('title')
    .notEmpty()
    .withMessage(`O titulo é obrigatório!`)
    .custom(async value => {
      const emailAlreadyExist = await prisma.tasks.findFirst({
        where: {
          title: value
        }
      })
      if (emailAlreadyExist) {
        return Promise.reject('Já existe uma tarefa com esse título!')
      }
    })
]
