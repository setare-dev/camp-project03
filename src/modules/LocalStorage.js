import {v4 as uuidv4} from 'uuid'

/**
 * This class is responsible for managing the removal and recording of information in local storage.
 */
class LocalStorage {

    /**
     * This property specifies the key name of the data in the local storage.
     */
    key = 'USERS_MY_APP'

    /**
     * This method is responsible for checking the key name in the local storage.
     * @returns The output is either true or false.
     */
    isDataInLocalStorage () {
        return this.key in localStorage
    }

    /**
     * This method is responsible for finding a record in the local storage.
     * @param id The ID contains the desired record.
     * @returns The output contains an object from a record.
     */
    select (id) {
        return JSON.parse(localStorage[this.key])?.filter(item => item.id === id)
    }

    /**
     * This method performs a search operation on a specific field.
     * @param field Contains the field name.
     * @param value Contains search value.
     * @returns Output records of data stored in local memory.
     */
    async search (field, value) {
        const data = await this.allWithDelay()
        return new Promise((resolve) => field === '*' ? resolve(data) : resolve(data.filter(item => item[field] === value)))
    }
    

    /**
     * This method is responsible for returning all data from the local storage.
     * @returns The output of the array is empty or all records in local storage.
     */
    all () {
        this.setTotal()
        if (!this.isDataInLocalStorage()) return []
        const data = JSON.parse(localStorage[this.key])
        this.setTotal(data.length)
        return data
    }

    /**
     * This method is responsible for returning all data from the local storage.
     * @returns The output of the array is empty or all records in local storage.
     */
     allWithDelay (delay = 2000) {
        return new Promise((resolve) => setTimeout(() => resolve(this.all()), delay))
    }

    /**
     * This method is responsible for recording a record in local storage.
     * @param obj Contains a object of data to record in local storage.
     * @returns The output of a promise of user id.
     */
    insert (obj) {
        return new Promise(resolve => {
            setTimeout(() => {
                const data = this.all()
                const id = uuidv4()
                data.unshift({...obj, id})
                localStorage[this.key] = JSON.stringify(data)
                this.setTotal(data.length)

                return resolve(id)
            }, 2000)
        })
    }

    /**
     * This method is responsible for recording several records in local storge.
     * @param data This parameter contains an array of data.
     * @returns The output of a promise is without value.
     */
    multipleInsert (data) {
        return new Promise(resolve => {
            localStorage[this.key] = !this.isDataInLocalStorage()
                ? JSON.stringify(data)
                : localStorage[this.key] = JSON.stringify([...data, ...JSON.parse(localStorage[this.key])])
            this.setTotal(this.all().length)

            return resolve()
        })
    }

    /**
     * This method is responsible for removing the desired record from the local storage.
     * @param id Contains the desired ID to delete the record.
     * @returns The output of a promise is without value.
     */
    delete (id, delay = 2000) {
        return new Promise(resolve => {
            setTimeout(() => {
                if (this.isDataInLocalStorage()) {
                    let data = JSON.parse(localStorage[this.key])
                    data = data.filter(item => item.id !== id)
                    localStorage[this.key] = JSON.stringify(data)
                    this.setTotal(data.length)

                    return resolve()
                }
            }, delay)
        })
    }

    /**
     * This method is responsible for removing all records from the local storage.
     * @returns Is the output of the class.
     */
    deleteAll () {
        localStorage[this.key] = '[]'
        this.setTotal()
        return this
    }

    /**
     * This method is for editing the record.
     * @param dataObj This parameter contains the information that is to be replaced.
     * @returns The output of a promise is without value.
     */
    update (dataObj) {
        return new Promise(resolve => {
            setTimeout(() => {
                if (this.isDataInLocalStorage()) {
                    let {id} = dataObj
                    let data = JSON.parse(localStorage[this.key])
                    let index = data.findIndex(user => user.id === id)
                    data[index] = dataObj
                    localStorage[this.key] = JSON.stringify(data)

                    return resolve()
                }
            }, 2000)
        })
    }

    /**
     * This method is responsible for storing the total number of records in the local storage.
     * @param count Contains the total number of records.
     */
    setTotal (count = 0) {
        localStorage.total = count
    }
}

export default new LocalStorage()