import React from 'react'
import {Container, Box} from '@material-ui/core'

const MyContainer = (props) => {
    return (
        <Container>
          <Box marginTop={2}>{props.content}</Box>
        </Container>
    )
}

export default MyContainer
