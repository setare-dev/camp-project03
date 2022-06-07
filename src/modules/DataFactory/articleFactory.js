import faker from '@faker-js/faker'
import Factory from '.'
import {createArticleService} from '../../services/articlesService'
import {createSlug} from '../helperFunctions'

class ArticleFactory extends Factory {

    $axios = createArticleService

    defination () {
        const sentences = faker.lorem.sentences(1)
        return {
            title: sentences,
            description: faker.lorem.paragraph(6).slice(0, 150),
            body: faker.lorem.paragraph(20),
            slug: createSlug(sentences),
            status: faker.datatype.number({min: 0, max: 1}) ? 'draft' : 'public',
            createdAt: Date.now(),
        }
    }
}

export default new ArticleFactory()