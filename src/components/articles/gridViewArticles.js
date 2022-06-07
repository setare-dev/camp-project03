import {useSelector} from 'react-redux'
import {setIsSelectAll, setSelectedRows} from '../../store/slices/articlesSlice'
import GridViewItemArticles from './gridViewItemArticles'
import TableElement from '../global/elements/tableElement'
import TableHead from '../global/table/tableHead'
import TableFooter from '../global/table/tableFooter'

const GridViewArticles = () => {

    const {articlesCurrentPage: articles} = useSelector(state => state.articles)

    return (
        <TableElement>
            <TableHead slice="articles" setIsSelectAll={setIsSelectAll} setSelectedRows={setSelectedRows} titles={['عنوان', 'وضعیت', 'تاریخ ثبت', 'عملیات']} />
            <tbody>{articles.map(article => <GridViewItemArticles key={article.id} {...article} />)}</tbody>
            <TableFooter dataLength={articles.length} colSpan="5"/>
        </TableElement>
    )
}

export default GridViewArticles