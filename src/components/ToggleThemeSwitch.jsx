import { useColorMode, Button, Switch, Text, Flex} from '@chakra-ui/react'

function ToggleThemeSwitch() {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
      <div class="switch">
        <Flex>
          <Text fontSize='xs' as='kbd' mr='8px'>Dark/Light</Text>
          <Switch onChange={toggleColorMode}></Switch>
          {/* <Button onClick={toggleColorMode}>
            Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
          </Button> */}
        </Flex>
      </div>
    );
  }

export default ToggleThemeSwitch;