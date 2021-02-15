import React from 'react'
import {Container} from '@material-ui/core'
import MyContainerStyle from './MyContainerStyle'
import clsx from 'clsx';

const MyContainer = (props) => {
    const style = MyContainerStyle()
    return (
      <div>
        <div className={style.drawerHeader}></div>
        <main className={clsx(style.content, {[style.contentShift]: props.open,})}>
          <Container>
            {props.children}
          </Container>
        </main>
      </div>
    )
}

export default MyContainer
