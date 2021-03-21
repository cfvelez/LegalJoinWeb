import React from 'react'
import MyContainerStyle from './MyContainerStyle'
import MyLinearIndeterminate from '../MyLinearIndeterminate/'

import clsx from 'clsx';

const MyContainer = (props) => {
    const style = MyContainerStyle()
    return (
        <main className={clsx(style.content, {[style.contentShift]: props.open,})} >
          <div className={style.contentFix}>
            {props.loading && <MyLinearIndeterminate/>}
            {props.children}
          </div>
        </main>
    )
}

export default MyContainer
