import { setting } from '#config/setting'
import Task from '#models/task'
import { ProcessingException } from '@folie/castle/exception'
import { handler } from '@folie/castle/helpers'

export default class Controller {
  handle = handler(async ({ ctx }) => {
    const { userId } = ctx.auth.session

    // Count the number of tasks for the user
    const taskCount = await Task.query().where('userId', userId).count('* as total')

    const totalTasks = taskCount[0].$extras.total

    // Check if the user has reached the task limit
    if (totalTasks >= setting.tasks.perUser) {
      throw new ProcessingException(`You can't create more than ${setting.tasks.perUser} tasks`)
    }

    // Create a new task for the user
    const task = await Task.create({
      title: 'Untitled',
      userId,
    })

    return { task: task.$serialize(), message: 'Task created successfully' }
  })
}
