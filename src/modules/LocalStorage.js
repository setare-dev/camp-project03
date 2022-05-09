/**
 * This class is responsible for managing the removal and recording of information in local storage.
 */
export default new class {

    /**
     * This property specifies the key name of the data in the local storage.
     */
    key = 'users'

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
        return JSON.parse(localStorage[this.key])?.filter(item => item.id == id)
    }
    

    /**
     * This method is responsible for returning all data from the local storage.
     * @returns The output of the array is empty or all records in local storage.
     */
    all () {
        if (!this.isDataInLocalStorage()) return []
        return JSON.parse(localStorage[this.key])
    }

    /**
     * This method is responsible for returning all data from the local storage.
     * @returns The output of the array is empty or all records in local storage.
     */
     allWithDelay (delay = 4000) {
        return new Promise((resolve) => setTimeout(() => resolve(this.all()), delay))
    }

    /**
     * This method is responsible for recording a record in local storage.
     * @param obj Contains a object of data to record in local storage.
     * @returns Generated user id output.
     */
    insert (obj) {
        const data = this.all()
        const id = Date.now()
        data.unshift({...obj, id})
        localStorage[this.key] = JSON.stringify(data)

        return id
    }

    /**
     * This method is responsible for recording several records in local storge.
     * @param data This parameter contains an array of data.
     */
    multipleInsert (data) {
        localStorage[this.key] = JSON.stringify(data)
    }

    /**
     * This method is responsible for removing the desired record from the local storage.
     * @param id Contains the desired ID to delete the record.
     */
    delete (id) {
        if (this.isDataInLocalStorage()) {
            let data = JSON.parse(localStorage[this.key])
            data = data.filter(item => item.id != id)
            localStorage[this.key] = JSON.stringify(data)
        }
    }

    /**
     * This method is responsible for removing all records from the local storage.
     * @returns Is the output of the class.
     */
    deleteAll () {
        localStorage[this.key] = []
        return this
    }

    /**
     * This method is for editing the record.
     * @param dataObj This parameter contains the information that is to be replaced.
     */
    update (dataObj) {
        if (this.isDataInLocalStorage()) {
            let {id} = dataObj
            let data = JSON.parse(localStorage[this.key])
            let index = data.findIndex(user => user.id == id)
            data[index] = dataObj
            localStorage[this.key] = JSON.stringify(data)
        }
    }

}