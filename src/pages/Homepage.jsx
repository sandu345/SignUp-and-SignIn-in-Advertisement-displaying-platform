import {
    Badge,
    chakra,
    Code,
    Heading,
    List,
    ListItem,
    OrderedList,
    Text
  } from '@chakra-ui/react'
  import React from 'react'
  import { Link, useLocation } from 'react-router-dom'
  import { Layout } from '../components/Layout'
  import { useAuth } from '../contexts/AuthContext'
  
  export default function Homepage() {
    const { currentUser } = useAuth()
    return (
      <Layout>
        <Heading>Home page</Heading>
        {/* <Text my={6}> {`The current user is : ${currentUser}`}</Text> */}
  
       
      
        <List>
          <ListItem>
            <Link to='/reset-password'>reset page</Link>
          </ListItem>
          <ListItem>
            <Link to='/forgot-password'>forgot page</Link>
          </ListItem>
          <ListItem>
            <Link to='/test'>test page</Link>
          </ListItem>
        </List>
      </Layout>
    )
  }
  