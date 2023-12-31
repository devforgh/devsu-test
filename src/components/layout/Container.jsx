import Header from './Header'
import PropTypes from 'prop-types'
import { styled } from 'styled-components'

const Wrapper = styled.div({
  width: '100%',
  minHeight: '100vh',
  backgroundColor: (props) => props.theme.palette.gray[100]
})

const Content = styled.div({
  width: '100%',
  maxWidth: '1200px',
  margin: '50px auto 0px'
})

const Container = (props) => {
  return (
    <Wrapper>
      <Header />
      <Content>{props.children}</Content>
    </Wrapper>
  )
}

Container.propTypes = {
  children: PropTypes.node.isRequired
}

export default Container
