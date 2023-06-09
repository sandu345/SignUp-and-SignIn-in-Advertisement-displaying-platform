import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  useToast,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaGoogle } from 'react-icons/fa'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Card } from '../components/Card'
import DividerWithText from '../components/DividerWithText'
import { Layout } from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'
import useMounted from '../hooks/useMounted'


export default function Loginpage() {
  const history = useHistory()
  const { signInWithGoogle, login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToast()
  const location = useLocation()


  const mounted = useMounted()

  function handleRedirectToOrBack() {
    
    history.replace(location.state?.from ?? '/profile')
   
  }

  return (
    <Layout>
      <Heading textAlign='center' my={12} color='#7451f8'>
        Login
      </Heading>
      <Card maxW='md' mx='auto' mt={4}>
        <chakra.form
          onSubmit={async e => {
            e.preventDefault()
            if (!email || !password) {
              toast({
                description: 'Credentials not valid.',
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
              return
            }
            // your login logic here
            setIsSubmitting(true)
            login(email, password)
              .then(res => {
                handleRedirectToOrBack()
              })
              .catch(error => {
                console.log(error.message)
                toast({
                  description: error.message,
                  status: 'error',
                  duration: 9000,
                  isClosable: true,
                })
              })
              .finally(() => {
                
                mounted.current && setIsSubmitting(false)
              })
          }}
        >
          <Stack spacing='6'>
            <FormControl id='email' color={'#7451f8'}>
              <FormLabel>Email address</FormLabel>
              <Input
                name='email'
                type='email'
                // color= 'purple'
                autoComplete='email'
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id='password' color={'#7451f8'}>
              <FormLabel>Password</FormLabel>
              <Input
                name='password'
                type='password'
                autoComplete='password'
                value={password}
                required
                onChange={e => setPassword(e.target.value)}
              />
            </FormControl>
            {/* <PasswordField /> */}
            <Button
              type='submit'
              colorScheme='#7451f8'
              size='lg'
              fontSize='md'
              isLoading={isSubmitting}
            >
              Sign in
            </Button>
          </Stack>
        </chakra.form>
        <HStack justifyContent='space-between' my={4}>
          <Button variant='link' color={'#7451f8'}>
            <Link to='/forgot-password' >Forgot password?</Link>
          </Button>
          <Button variant='link' onClick={() => history.push('/register')} color={'#7451f8'}>
            Register
          </Button>
        </HStack>
        <DividerWithText my={6} color={'#7451f8'}>OR</DividerWithText>
        <Button
          variant='outline'
          isFullWidth
          colorScheme='purple'
          leftIcon={<FaGoogle />}
          onClick={() =>
            signInWithGoogle()
              .then(user => {
                handleRedirectToOrBack()
                console.log(user)
              })
              .catch(e => console.log(e.message))
          }
        >
          Sign in with Google
        </Button>
      </Card>
    </Layout>
    
  )
}
