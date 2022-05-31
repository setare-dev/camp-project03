import GridViewItemArticles from './gridViewItemArticles'
import TableElement from '../global/elements/tableElement'
import TableHead from '../global/table/tableHead'
import TableFooter from '../global/table/tableFooter'

const GridViewArticles = ({articles}) => (
    <TableElement>
        <TableHead titles={['عنوان', 'وضعیت', 'تاریخ ثبت', 'عملیات']}/>
        <tbody>{articles.map(article => <GridViewItemArticles key={article.id} {...article} />)}</tbody>
        <TableFooter dataLength={articles.length} colSpan="5"/>
    </TableElement>
)

export default GridViewArticles