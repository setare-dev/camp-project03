import DataSetItem from './dataSetItemArticles'
import {EMPTY_DATA} from '../../constants/responsesConstant'

const DataSetArticles = ({articles}) => (
    <div className="my-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map(article => <DataSetItem key={article.id} {...article} />)}
        </div>
        {!articles.length ? <div className="bg-indigo-100 dark:bg-gray-600 rounded-lg p-4 text-gray-500 dark:text-gray-100 text-md">{EMPTY_DATA}</div> : null}
    </div>
)

export default DataSetArticles