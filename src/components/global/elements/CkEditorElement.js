import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import LabelElement from './labelElement'

const CKEditorElement = ({label, keyname, value, error, inputHandler, ...rest}) => (
    <div className={`${localStorage.theme === 'dark' ? 'ck-dark' : ''} mb-5`}>
        <LabelElement text={label} />
        <div className="mt-2">
            <CKEditor {...rest} 
                config={{language: 'fa', toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote']}}
                editor={ClassicEditor} 
                data={value} 
                onBlur={( event, editor ) => inputHandler(keyname, editor.getData())} />
        </div>
        <small className="text-red-500">{error}</small>
    </div>
)

export default CKEditorElement