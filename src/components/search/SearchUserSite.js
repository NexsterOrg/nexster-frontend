
import { useLocation } from 'react-router-dom';
import SearchUserResults from './SearchUserResults';
import Base1 from '../layout/base1';

export default function SearchUserSite() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query') || "";

    return <Base1 SideComponent={<SearchUserResults keyword={query} rootStyles={{marginX: "30px", marginBottom: "30px", marginTop: "20px"}}/>} styles={{alignItems: "flex-start"}}/>

}
