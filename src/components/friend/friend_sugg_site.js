import { useState, useEffect } from "react"

import Base1 from "../layout/base1";
import FriendSuggPanel from "./friends_sugg_panel"
import { ListFriendSuggs } from "../../apis/fetch"

const suggsPageSize = 16
const gap = 330
let limit = 0

function SideFriendSuggsSite(){
    const [suggList, addSuggToList] = useState([])
    const [pageNo, setPageNo] = useState(1)

    useEffect(()=> {
        window.scrollTo(0, 0);

        (async () => {
            if(pageNo <= 0) return
            try {
                const newSuggs = await ListFriendSuggs(pageNo, suggsPageSize)
                addSuggToList(newSuggs.data)
                if(newSuggs.resultsCount < suggsPageSize){
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
        const handleFriendSuggsScroll = async () => {
            if(window.scrollY >= limit){
                limit += gap
                if(pageNo <= 0){
                    // we make pageNo to -1 if nothing to there to fetch
                    return
                }
                try {
                    const newSuggs = await ListFriendSuggs(pageNo, suggsPageSize)
                    addSuggToList(preList => preList.concat(newSuggs.data))
                    if(newSuggs.resultsCount < suggsPageSize){
                        setPageNo(-1)
                        return
                    }
                    setPageNo(preVal => preVal + 1)
                } catch (err) {
                    console.error(err)
                }
            }
        }
        window.addEventListener('scroll', handleFriendSuggsScroll)
      
        // do the cleanup
        return () => {
          window.removeEventListener('scroll', handleFriendSuggsScroll);
        };

    }, [suggList])


    return (
        <FriendSuggPanel rootStyles={{margin: "30px"}} suggList={suggList} 
            suggCount={1} showButton={false}/>
    )
}

export default function FriendSuggsSite(){
    return <Base1 SideComponent={<SideFriendSuggsSite />} styles={{alignItems: "flex-start"}}/>
}
