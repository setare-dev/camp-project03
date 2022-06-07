import faker from '@faker-js/faker'
import Factory from '.'
import {createTodoService} from '../../services/todosService'

class TodoFactory extends Factory {

    $axios = createTodoService

    defination () {
        return {
            text: faker.lorem.paragraph(2).slice(0, 40),
            done: faker.datatype.number({min: 0, max: 1}),
            createdAt: Date.now(),
        }
    }
}

export default new TodoFactory()