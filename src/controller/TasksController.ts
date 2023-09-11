import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { ITask } from '../interface/ITask'
import { validationResult } from 'express-validator'

const prisma = new PrismaClient()

export const createTask = async (
  req: Request<{}, {}, ITask>,
  res: Response
) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { title, descript } = req.body
    const now = new Date()
    const register = await prisma.tasks.create({
      data: {
        title: title,
        descript: descript ? descript : '',
        updatedAt: now
      }
    })
    res.status(200).send(register)
  } catch (err) {
    res.status(500).send({ error: err })
  }
}
export const listTasks = async (req: Request, res: Response) => {
  const tasks = await prisma.tasks.findMany()
  if (!tasks) {
    res.status(400).send('Não há tarefas cadastradas!')
  }
  res.status(200).send(tasks)
}

export const listTaskById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const id = req.params.id
  const task = await prisma.tasks.findFirst({ where: { id: id } })
  if (!task) {
    res.status(400).send({ msg: 'Tarefa não encontrada!' })
  }
  res.status(200).send(task)
}

export const updateTask = async (
  req: Request<{ id: string }, {}, ITask>,
  res: Response
) => {
  const id = req.params.id
  const { title, descript, done } = req.body
  const now = new Date()
  const updatedTask = await prisma.tasks.update({
    where: {
      id: id
    },
    data: {
      ...(title && { title: title }),
      ...(descript && { descript: descript }),
      ...{ done: done },
      updatedAt: now
    }
  })
  res.status(200).send(updatedTask)
}
export const deleteTask = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const id = req.params.id
  await prisma.tasks.delete({ where: { id: id } })
  res.status(200).send({ msg: 'Tarefa excluida!' })
}
