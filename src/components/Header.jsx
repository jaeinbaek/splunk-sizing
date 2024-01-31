import ToggleThemeSwitch from './ToggleThemeSwitch';
import { Box, Flex, Spacer, Heading, Text } from '@chakra-ui/react'

function Header() {
    return (
        <div className="header">
            <Flex m='24px'>
                <Box>
                <Heading size='lg'>Splunk Sizer</Heading>
                <Text pt='2' fontSize='sm' mb='8px'>
                    Blah Blah foo bar
                </Text>
                </Box>
                <Spacer />
                <ToggleThemeSwitch />
            </Flex>
        </div>
    );
}

export default Header;
