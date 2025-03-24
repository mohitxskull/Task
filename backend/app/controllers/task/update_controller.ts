import { squid } from '#config/squid'
import Task from '#models/task'
import { TaskBodySchema, TaskTitleSchema } from '#validators/index'
import { ProcessingException } from '@folie/castle/exception'
import { handler } from '@folie/castle/helpers'
import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

export default class Controller {
  // Define input schema for validation
  input = vine.compile(
    vine.object({
      params: vine.object({
        taskId: squid.task.schema,
      }),
      title: TaskTitleSchema.optional(),
      body: TaskBodySchema.optional(),
      important: vine.boolean().optional(),
      completed: vine.boolean().optional(),
    })
  )

  handle = handler(async ({ ctx }) => {
    // Validate request payload
    const payload = await ctx.request.validateUsing(this.input)

    const { userId } = ctx.auth.session

    // Fetch the task for the authenticated user
    const task = await Task.query()
      .where('id', payload.params.taskId)
      .andWhere('userId', userId)
      .first()

    // Throw an exception if task is not found
    if (!task) {
      throw new ProcessingException('Task not found', {
        status: 'NOT_FOUND',
      })
    }

    // Update task properties if provided in the payload
    if (payload.title) {
      task.title = payload.title
    }

    if (payload.body) {
      task.body = payload.body
    }

    if (payload.important !== undefined) {
      task.important = payload.important
    }

    if (payload.completed !== undefined) {
      task.completedAt = payload.completed ? DateTime.utc() : null
    }

    // Save the updated task
    await task.save()

    // Return the updated task and a success message
    return { task: task.$serialize(), message: `Task "${task.title}" updated successfully` }
  })
}
