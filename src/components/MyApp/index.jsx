import React, {useState} from 'react'
import MyAppStyle from './MyAppStyle'
import MyNavBar from '../MyNavBar'
import MyMenu from '../MyMenu'
import MyDrawer from '../MyDrawer'
import MyContainer from '../MyContainer'
import RoutingSystem from '../../app/routing/'

const MyApp = () => {
  const style = MyAppStyle()
  const [open, setOpen] = useState(false)
  return (
    <div className={style.root}>
      <MyNavBar open={open} onClick={()=>setOpen(true)}/>
        <MyDrawer open={open} onClick={()=>setOpen(false)}><MyMenu/></MyDrawer>
      <MyContainer open={open}> <RoutingSystem/></MyContainer>
    </div>
  )
}

export default (MyApp)
