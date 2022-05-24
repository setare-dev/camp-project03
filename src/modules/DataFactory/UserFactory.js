import faker from '@faker-js/faker'
import Factory from './Factory'
import axiosUsers from '../../axios/users'

class UserFactory extends Factory {

    $axios = axiosUsers

    $route = '/users'

    defination () {
        let {gender, maleOrFemale} = this.fakeGender()
        return {
            name: faker.name.firstName(maleOrFemale),
            family: faker.name.lastName(),
            day: faker.datatype.number({min: 1, max: 31}),
            month: faker.datatype.number({min: 1, max: 12}),
            year: faker.datatype.number({min: 1350, max: 1401}),
            gender,
            isAdmin: Boolean(faker.datatype.number({min: 0, max: 1})),
            email: this.fakeEmail(),
            password: '12345678',
            createdAt: Date.now(),
        }
    }
}

export default new UserFactory()