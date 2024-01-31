import { useColorMode, Button } from '@chakra-ui/react'

function ToggleThemeSwitch() {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
      <div>
        <header>
          <Button onClick={toggleColorMode}>
            Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
          </Button>
        </header>
      </div>
    );
  }

export default ToggleThemeSwitch;