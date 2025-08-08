import { Button } from '@chakra-ui/react'
import React from 'react'
import { useColorMode } from '@chakra-ui/react'

const ButtonColorMode = () => {
    const { colorMode, toggleColorMode } = useColorMode()
  return (
    <header>
        <Button onClick={toggleColorMode}>
            Alterar para Modo {colorMode === 'light' ? '🌑' : '☀️'}
        </Button>
    </header>
  )
}

export default ButtonColorMode