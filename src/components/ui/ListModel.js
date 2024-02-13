import { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogTitle, List, DialogContent, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// import FavoriteIcon from '@mui/icons-material/Favorite';
// import PersonPinIcon from '@mui/icons-material/PersonPin'

import { UserReactionCard } from '../events/EventReactionModel';
import { ListEventReactUsers, UnAuthorizedError, LoginPath } from "../../apis/fetch";

const resultsPerFetch = 15
const gap = 330
let limit = 0

export default function ListModel({open, setOpen, eventKey, reactType}) {
  const navigate = useNavigate();
  const [reactedUsers, addReactedUser] = useState({data: [], size: 0})
  const [pageNo, setPageNo] = useState(1)
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    limit = 0;
    (async () => {
        if(pageNo <= 0) return
        try {
          let newReactedUsers = await ListEventReactUsers(eventKey, reactType, pageNo, resultsPerFetch);
          addReactedUser(newReactedUsers);
          if (newReactedUsers.size < resultsPerFetch) {
            setPageNo(-1)
            return;
          }
          setPageNo(2)
        } catch (err) {
            if (err instanceof UnAuthorizedError) {
                navigate(LoginPath, { replace: true });
                return
            } 
        }
    })();
}, [])

  const handleScroll = async (event) => {
    if(scrollPosition >= limit){
        limit += gap
        if(pageNo <= 0) return
        try {
            let newReactedUsers = await ListEventReactUsers(eventKey, reactType, pageNo, resultsPerFetch);
            addReactedUser(preState => ({ data: preState.data.concat(newReactedUsers.data), size: preState.size + newReactedUsers.size }) )
            if (newReactedUsers.size < resultsPerFetch) {
              setPageNo(-1)
              return;
            }
            setPageNo(preVal => preVal + 1)
        } catch (err) {
            if (err instanceof UnAuthorizedError) {
                navigate(LoginPath, { replace: true });
                return
            }
        }
    }
    setScrollPosition(event.target.scrollTop);
  }

  const handleClose = () => {
      setOpen(false)
  }

  return (
      <Dialog
        open={open} 
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-model-title"
        aria-describedby="scroll-model-description"
      >
        <DialogTitle sx={{fontSize: 18, paddingTop: 2, paddingBottom: 1, fontWeight: "bold"}}> {reactType} </DialogTitle>
        <DialogContent onScroll={handleScroll} sx={{paddingBottom: 0}}>
          <List>
            {
              reactedUsers.size ?
              reactedUsers.data.map((elem, index) => {
                return (
                  <UserReactionCard key={index} name={elem.username} faculty={elem.faculty} field={elem.field}
                    imgUrl={elem.imageUrl} batch={elem.batch} indexNo={elem.indexNo}/>
                )
              }) : 
              
              <Box sx={{width: 500, padding: 1}}>
                <Typography> No one has reacted yet. Be the first!</Typography>
              </Box>
            }
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{textTransform: "none"}}>Close</Button>
        </DialogActions>
      </Dialog>
  );
}

/** TODO
 * 6. Event creation UIs
 */