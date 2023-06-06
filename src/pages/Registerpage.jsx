import {
    background,
    Button,
    Center,
    chakra,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Select,
    Stack,
    useToast,
  } from '@chakra-ui/react'
  import React, { useEffect, useRef, useState } from 'react'
  import { FaGoogle } from 'react-icons/fa'
  import { useHistory } from 'react-router-dom'
  import { Card } from '../components/Card'
  import DividerWithText from '../components/DividerWithText'
  import { Layout } from '../components/Layout'
  import { useAuth } from '../contexts/AuthContext'
  import { collection, addDoc } from 'firebase/firestore' 
  import { db } from "../utils/init-firebase"
 
  
  
  const Registerpage = () => {
    const history = useHistory()
    const { signInWithGoogle, register } = useAuth()
    const [fName, setfName] = useState('')
    const [lName, setlName] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [password, setPassword] = useState('')
    const [cPassword, setCpassword] = useState('')
    const [accountType, setAccountType] = useState('')
    const [accountTypeErrorMessage, setAccountTypeErrorMessage] = useState('')
    const [ setFNameErrorMessage] = useState('')
    const [ setLNameErrorMessage] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const toast = useToast()
    const mounted = useRef(false)
    
  
    
  
    useEffect(() => {
      mounted.current = true
      return () => {
        mounted.current = false
      }
    }, [])
  
   
  
   
  
    return (
      //<div style={{backgroundImage:`url(${img})`}}>
      <div className='col'>
        <Layout>
          <Heading textAlign='center' my={12}>
            Register
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
                 if(!accountType){
                  setAccountTypeErrorMessage('Please select an account type.')
                  return
                 }
                 if(password !== cPassword){
                  toast({
                    description: 'Passwords do not match.',
                    status: 'error',
                    duration: 9000,
                    isClosable: true
                  })
                  return
                 }
               
  
                setIsSubmitting(true)
                register(email, password)
                  .then(async (res) => {
                    const userRef = collection(
                      db,
                      accountType === 'developer' ? 'DeveloperCollection' : 'CustomerCollection'
                    );
                    await addDoc(userRef, {
                      fName: fName,
                      lName: lName,
                      email: email,
                      password: password,
                    });
  
                    toast({
                      description: 'Registration successful. Verification email sent.',
                      status: 'success',
                      duration: 9000,
                      isClosable: true,
                    });
                  })
                  .catch((error) => {
                    console.log(error.message);
                    toast({
                      description: error.message,
                      status: 'error',
                      duration: 9000,
                      isClosable: true,
                    });
                  })
                  .finally(() => {
                    mounted.current && setIsSubmitting(false);
                  });
  
  
                
              }}
            >
              <Stack spacing='6'>
                <FormControl id='accountType'>
                  <FormLabel>Account Type</FormLabel>
                  <Select
                    placeholder='Select account type'
                    value={accountType}
                    onChange={e => {
                      setAccountType(e.target.value)
                      setAccountTypeErrorMessage('')
                    }}
                  >
                    
                    <option value='customer'>Customer</option>
                    <option value='developer'>Developer</option>
                  </Select>
                </FormControl>
  
                {accountTypeErrorMessage && <span style={{color: 'red'}}>{accountTypeErrorMessage}</span>}
  
                <FormControl id='fName'>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    name='fName'
                    type='text'
                    autoComplete='fName'
                    required
                    value={fName}
                    onChange={e => {
                      setfName(e.target.value)
                    }}
                    
                  />
                </FormControl>
  
                <FormControl id='lName'>
                <FormLabel>Last Name</FormLabel>
                <Input
                  name='lName'
                  type='text'
                  autoComplete='lName'
                  required
                  value={lName}
                  onChange={e =>  {
                    setlName(e.target.value)
                  }}
                
                />
              </FormControl>
             
              <FormControl id='email'>
                <FormLabel>Email address</FormLabel>
                <Input
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </FormControl>
  
              
              
              <FormControl id='password'>
                <FormLabel>Password</FormLabel>
                <Input
                  name='password'
                  type='password'
                  autoComplete='password'
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </FormControl>
  
              
              <FormControl id='cPassword'>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  name='cPassword'
                  type='password'
                  autoComplete='cPassword'
                  required
                  value={cPassword}
                  onChange={e => setCpassword(e.target.value)}
                />
              </FormControl> 
  
              <br />
              <Button
                type='submit'
                colorScheme='pink'
                size='lg'
                fontSize='md'
                isLoading={isSubmitting}
              >
                Sign up
              </Button>
              
             
            </Stack>
          </chakra.form>
          <Center my={4}>
            <Button variant='link' onClick={() => history.push('/login')}>
              Login
            </Button>
          </Center>
          <DividerWithText my={6}>OR</DividerWithText>
          <Button
            variant='outline'
            isFullWidth
            colorScheme='red'
            leftIcon={<FaGoogle />}
            onClick={() =>
              signInWithGoogle()
                .then(user => console.log(user))
                .catch(e => console.log(e.message))
            }
          >
            Sign in with Google
          </Button>
        </Card>
      </Layout>
      </div>
      //</div>
      
      
    
      
    )
  }
  
  export default Registerpage;
  