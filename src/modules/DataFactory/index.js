import faker from '@faker-js/faker'

/**
 * This class is for making and removing fake data.
 */
class DataFactory {

    $locale = 'fa'

    $axios = ''

    $count = 10

    /**
     * Batch registration of data in local storage or end api.
     * @param to This parameter contains the storage driver.
     */
     create () {
        return new Promise(async resolve => {
            await this.loopForCreate()
            return resolve()
        })
    }

    async loopForCreate () {
        faker.locale = this.$locale
        for (let i = 0; i < this.$count; i++) {
            await this.$axios(this.defination())
        }
    }

    count (value = 10) {
        this.$count = value
        return this
    }

    locale (value) {
        this.$locale = value
        return this
    }

    axios (value) {
        this.$axios = value
        return this
    }

    fakeEmail () {
        faker.locale = 'en'
        const email = faker.internet.email()
        faker.locale = this.$locale
        return email
    }
}

export default DataFactory