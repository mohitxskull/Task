import { squid } from '#config/squid'
import Task from '#models/task'
import { ProcessingException } from '@folie/castle/exception'
import { handler } from '@folie/castle/helpers'
import vine from '@vinejs/vine'

export default class Controller {
  input = vine.compile(
    vine.object({
      params: vine.object({
        taskId: squid.task.schema,
      }),
    })
  )

  handle = handler(async ({ ctx }) => {
    const payload = await ctx.request.validateUsing(this.input)

    const { userId } = ctx.auth.session

    const task = await Task.query()
      .where('id', payload.params.taskId)
      .andWhere('userId', userId)
      .first()

    if (!task) {
      throw new ProcessingException('Task not found', {
        status: 'NOT_FOUND',
      })
    }

    await task.delete()

    return {
      task: task.$serialize(),
      message: `Task "${task.title}" deleted successfully`,
    }
  })
}
