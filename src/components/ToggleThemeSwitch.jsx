import { 
  useColorMode,
  Switch,
  Text,
  Flex
  } from '@chakra-ui/react'

function ToggleThemeSwitch() {
    const { toggleColorMode } = useColorMode()

    return (
      <div class="switch">
        <Flex>
          <Text fontSize='xs' as='kbd' mr='8px'>Dark/Light</Text>
          <Switch onChange={toggleColorMode}></Switch>
        </Flex>
      </div>
    );
  }

export default ToggleThemeSwitch;