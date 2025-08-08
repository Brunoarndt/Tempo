import { useState } from "react";
import { Input, InputGroup, InputRightElement, Button, useColorModeValue } from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');

  const inputTextColor = useColorModeValue('gray.800', 'gray.100');
  const inputBgColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <InputGroup maxW="400px" mt={{ base: 8, md: 0 }}>
      <Input
        placeholder="Digite uma cidade..."
        value={input}
        color={inputTextColor}
        bg={inputBgColor}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && onSearch(input)}
      />
      <InputRightElement width="4.5rem">
        <Button 
          h="1.75rem" 
          size="sm"
          onClick={() => onSearch(input)}
          colorScheme="blue"
        >
          <CiSearch />
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
