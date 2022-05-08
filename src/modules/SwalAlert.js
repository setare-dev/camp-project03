import swal from 'sweetalert2'

/**
 * This class is responsible for presenting the properties of sweet alert
 */
export default new class {
    /**
     * This method displays a message in the form of toast.
     * @param type This parameter contains the type of error that is either success or error.
     * @param title This parameter contains the text of the message.
     * @param timer This parameter is the display time of the message in milliseconds.
     * @param position This parameter contains the message position.
     */
    toast(type, title, timer = 3000, position = 'bottom-end')
    {
        swal.mixin({
            position,
            timer,
            toast: true,
            showConfirmButton: false,
            timerProgressBar: true,
            iconColor: '#fff',
            color: '#fff',
            background: type == 'success' ? 'rgb(21 128 61)' : 'rgb(185 28 28)',
            showCloseButton: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', swal.stopTimer)
                toast.addEventListener('mouseleave', swal.resumeTimer)
            }
        }).fire({
            icon: type == 'success' ? 'success' : 'error',
            title,
        })
    }

    /**
     * This method asks the user a question message and receives the result from the user and sends it to the output.
     * @param html This parameter contains the text of the question.
     * @param confirmButtonText This parameter contains the word confirmation.
     * @param cancelButtonText This parameter contains the word cancel.
     * @returns The output of this method is promise true or promise false.
     */
    question(html = 'آیا اطمینان دارید؟', confirmButtonText = 'بلی', cancelButtonText = 'خیر')
    {
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