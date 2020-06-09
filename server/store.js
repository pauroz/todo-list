
const storage = require('azure-storage')
const service = storage.createTableService('mtodo', 'SBRxpcI6i2PaoeWzedd32pwMsSohZQvUlVeIS2KqXlr2GyVrUnfJJ9QrqgyYg1/SZAagvWwdhFzKBw4iQxLAZA==')
const table = 'tasks'

const init = async () => (
  new Promise((resolve, reject) => {
    service.createTableIfNotExists(table, (error, result, response) => {
      !error ? resolve() : reject()
    })
  })
)



const uuid = require('uuid')

const addTask = async ({ title }) => (
  new Promise((resolve, reject) => {
    const gen = storage.TableUtilities.entityGenerator
    const task = {
      PartitionKey: gen.String('task'),
      RowKey: gen.String(uuid.v4()),
      title
    }

    service.insertEntity(table, task, (error) => {
      !error ? resolve() : reject()
    })
  })
)
const listTasks = async () => (
  new Promise((resolve, reject) => {
    const query = new storage.TableQuery()
      .select(['title'])
      .where('PartitionKey eq ?', 'task')

    service.queryEntities(table, query, null, (error, result) => {
      !error ? resolve(result.entries.map((entry) => ({
        title: entry.title._
      }))) : reject()
    })
  })
)

module.exports = {
  init,
  addTask,
  listTasks
}