import swal from 'sweetalert2'

/**
 * This class is responsible for presenting the properties of sweet alert
 */
class SweetAlert {
    toast (type, title, timer = 3000, position = 'bottom-end') {
        swal.fire({
            title,
            position,
            timer,
            toast: true,
            showConfirmButton: false,
            timerProgressBar: true,
            iconColor: '#fff',
            color: '#fff',
            icon: type === 'success' ? 'success' : 'error',
            background: type === 'success' ? 'rgb(21 128 61)' : 'rgb(185 28 28)',
            showCloseButton: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', swal.stopTimer)
                toast.addEventListener('mouseleave', swal.resumeTimer)
            }
        })
    }
    
    question (html = 'آیا اطمینان دارید؟', confirmButtonText = 'بلی', cancelButtonText = 'خیر') {
        return new Promise((resolve) => {
            return swal.fire({
                icon: 'question',
                html,
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText,
                cancelButtonText
            }).then(result => {
                if(result.isConfirmed) return resolve(true)
                return resolve(false)
            })
        })
    }
}

export default new SweetAlert()