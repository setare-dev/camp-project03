import localS from './LocalStorage'
import {v4 as uuidv4} from 'uuid'

/**
 * This class is for making and removing fake data.
 */
class DataFactory {
    /**
     * An array of fake data.
     */
    data = [
        {name: 'رضا', family: 'پارسایی', day: 12, month: 2, year: 1360, gender: '0', email: 'reza@gmail.com', isAdmin: '0', createdAt: Date.now()},
        {name: 'مهسا', family: 'صالحی', day: 13, month: 3, year: 1364, gender: '1', email: 'mahsa@gmail.com', isAdmin: '0', createdAt: Date.now()},
        {name: 'سارا', family: 'اسماعیلی', day: 14, month: 6, year: 1361, gender: '1', email: 'sara@gmail.com', isAdmin: '0', createdAt: Date.now()},
        {name: 'محمد', family: 'محمودی', day: 15, month: 7, year: 1368, gender: '0', email: 'mohammad@gmail.com', isAdmin: '0', createdAt: Date.now()},
        {name: 'امین', family: 'فرهادی', day: 16, month: 2, year: 1369, gender: '0', email: 'amin@gmail.com', isAdmin: '1', createdAt: Date.now()},
        {name: 'زهرا', family: 'امینی', day: 17, month: 4, year: 1362, gender: '1', email: 'zahra@gmail.com', isAdmin: '1', createdAt: Date.now()},
        {name: 'فرهاد', family: 'کریمی', day: 18, month: 5, year: 1361, gender: '0', email: 'farhad@gmail.com', isAdmin: '0', createdAt: Date.now()},
        {name: 'امیر', family: 'محمدی', day: 19, month: 7, year: 1365, gender: '0', email: 'amir@gmail.com', isAdmin: '0', createdAt: Date.now()},
        {name: 'مهشید', family: 'رضایی', day: 22, month: 9, year: 1366, gender: '1', email: 'mahsh.com', isAdmin: '0', createdAt: Date.now()},
        {name: 'شیدا', family: 'شفیعی', day: 24, month: 10, year: 1367, gender: '1', email: 'shayda@gmail.com', isAdmin: '1', createdAt: Date.now()},
        {name: 'سینا', family: 'شیرازی', day: 25, month: 12, year: 1369, gender: '0', email: 'sina@gmail.com', isAdmin: '1', createdAt: Date.now()},
        {name: 'آرمان', family: 'کرمانی', day: 2, month: 2, year: 1370, gender: '0', email: 'arman@gmail.com', isAdmin: '1', createdAt: Date.now()},
        {name: 'آرش', family: 'تهرانی', day: 1, month: 12, year: 1381, gender: '0', email: 'arash@gmail.com', isAdmin: '1', createdAt: Date.now()},
        {name: 'ملیکا', family: 'شیرانی', day: 3, month: 10, year: 1358, gender: '1', email: 'melika@gmail.com', isAdmin: '0', createdAt: Date.now()},
        {name: 'حسام', family: 'موسوی', day: 1, month: 4, year: 1359, gender: '0', email: 'hesam@gmail.com', isAdmin: '0', createdAt: Date.now()},
        {name: 'سامان', family: 'عباسی', day: 7, month: 2, year: 1365, gender: '0', email: 'saman@gmail.com', isAdmin: '1', createdAt: Date.now()},
        {name: 'مهیا', family: 'قربانی', day: 12, month: 5, year: 1366, gender: '1', email: 'mahya@gmail.com', isAdmin: '1', createdAt: Date.now()},
        {name: 'عباس', family: 'فریدی', day: 11, month: 7, year: 1360, gender: '0', email: 'abbas@gmail.com', isAdmin: '0', createdAt: Date.now()}
    ]

    /**
     * Batch registration of data in local storage.
     */
     insert () {
        return new Promise(resolve => {
            const data = this.data.map(item => ({id: uuidv4(), ...item}))
            localS.multipleInsert(data)
    
            return resolve()
        })
    }

    /**
     * Delete all data from local storage.
     */
    delete () {
        localS.deleteAll()
        return this
    }
}

export default DataFactory