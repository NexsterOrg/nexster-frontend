import { useState, useEffect } from "react"

import FriendReqsPanel from "./friend_req_panel"
import { ListFriendReqs, GetAllFriendReqsCount } from "../../apis/fetch"
import Base1 from "../layout/base1";

const postCnt = 15

const gap = 330
let limit = 0

function SideFriendReqSite(){
    const [reqList, addReqToList] = useState([])
    const [totalReqCount, setTotalReqCount] = useState(0)
    const [pageNo, setPageNo] = useState(1)

    useEffect(()=> {
        window.scrollTo(0, 0);

        (async () => {
            if(pageNo <= 0) return
            try {
                const newReqs = await ListFriendReqs(pageNo, postCnt)
                const allReqsCount = await GetAllFriendReqsCount()
                addReqToList(newReqs.data)
                setTotalReqCount(allReqsCount)
                if(newReqs.size < postCnt){
                    setPageNo(-1)
                    return
                }
                setPageNo(2)
            } catch (err) {
                console.error(err)
            }
        })()
    }, [])

    useEffect(() => {
        const handleFriendReqsScroll = async () => {
            if(window.scrollY >= limit){
                limit += gap
                if(pageNo <= 0){
                    // we make pageNo to -1 if nothing to there to fetch
                    return
                }
                try {
                    const newReqs = await ListFriendReqs(pageNo, postCnt)
                    addReqToList(preList => preList.concat(newReqs.data))
                    if(newReqs.size < postCnt){
                        setPageNo(-1)
                        return
                    }
                    setPageNo(preVal => preVal + 1)
                } catch (err) {
                    console.error(err)
                }
            }
        }
        window.addEventListener('scroll', handleFriendReqsScroll)
      
        // do the cleanup
        return () => {
          window.removeEventListener('scroll', handleFriendReqsScroll);
        };

    }, [reqList])

    return (
        <FriendReqsPanel rootStyles={{margin: "30px"}} reqList={reqList} reqCount={totalReqCount} showButton={false}/>
    )
}

export default function FriendReqSite(){
    return <Base1 SideComponent={<SideFriendReqSite />} styles={{alignItems: "flex-start"}}/>
}
