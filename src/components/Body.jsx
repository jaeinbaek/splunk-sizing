import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Text,
    Heading,
    Box,
    Stack,
    VStack,
    HStack,
    StackDivider,
    Slider,
    SliderTrack,
    SliderThumb,
    SliderFilledTrack,
    SliderMark,
    Tooltip,
    NumberInputField,
    NumberInput,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Table,
    TableContainer,
    Thead,
    Tr,
    Th,
    Td,
    Tbody,
    Wrap
} from '@chakra-ui/react'
import ConfigView from './ConfigView';

function Body() {

    //// Input Data
    // Daily Data Volume
    const formatDDV = (val) => val + `GB`
    const parseDDV = (val) => val.replace(/GB/, '')

    const [DDV, setDDV] = React.useState('15')

    // Raw Compression Factor
    const [RCF, setRCF] = React.useState(0.3)
    const [showRCFTooltip, setShowRCFTooltip] = React.useState(false)

    // Metadata Size Factor
    const [MSF, setMSF] = React.useState(0.5)
    const [showMSFTooltip, setShowMSFTooltip] = React.useState(false)


    //// Data Retention
    // HotWarm
    const [DRHW, setDRHW] = React.useState('15')
    const formatDRHW = (val) => val + `Days`
    const parseDRHW = (val) => val.replace(/Days/, '')

    // Cold
    const [DRCO, setDRCO] = React.useState('30')
    const formatDRCO = (val) => val + `Days`
    const parseDRCO = (val) => val.replace(/Days/, '')

    // Frozen
    const [DRFR, setDRFR] = React.useState('365')
    const formatDRFR = (val) => val + `Days`
    const parseDRFR = (val) => val.replace(/Days/, '')


    //// Architecture
    // Number of Indexers
    const [NOI, setNOI] = React.useState('5')

    // RF
    const [RF, setRF] = React.useState('3')

    // SF
    const [SF, setSF] = React.useState('2')

    //// Result
    //     resultHotworm = Math.round((일일수집량 * 원본압축률 * 복제팩터 * H/W보관기간) + (일일수집량 * 메타데이터압축률 * 검색팩터 * H/W보관기간))
    // resultHotwormPerIdx = Math.round(((일일수집량 * 원본압축률 * 복제팩터 * H/W보관기간) + (일일수집량 * 메타데이터압축률 * 검색팩터 * H/W보관기간)) / 인덱서 노드수)

    // resultCold = Math.round((일일수집량 * 원본압축률 * 복제팩터 * Cold 보관기간) + (일일수집량 * 메타데이터압축률 * 검색팩터 * Cold 보관기간))
    // resultColdPerIdx = Math.round(((일일수집량 * 원본압축률 * 복제팩터 * Cold 보관기간) + (일일수집량 * 메타데이터압축률 * 검색팩터 * Cold 보관기간)) / 인덱서 노드수)

    // resultFrozen = Math.round((일일수집량 * 원본압축률 * 복제팩터 * Frozen보관기간))
    // resultFrozenPerIdx = Math.round(((일일수집량 * 원본압축률 * 복제팩터 * Frozen보관기간)) / 인덱서 노드수)

    let resultHW = Math.round((DDV * RCF * RF * DRHW) + (DDV * MSF * SF * DRHW))
    let resultHWPerIdx = Math.round(((DDV * RCF * RF * DRHW) + (DDV * MSF * SF * DRHW)) / NOI)


    let resultCO = Math.round((DDV * RCF * RF * DRCO) + (DDV * MSF * SF * DRCO))
    let resultCOPerIdx = Math.round(((DDV * RCF * RF * DRCO) + (DDV * MSF * SF * DRCO)) / NOI)


    let resultFR = Math.round((DDV * RCF * RF * DRFR))
    let resultFRPerIdx = Math.round(((DDV * RCF * RF * DRFR)) / NOI)

    let resultTotal = resultHW + resultCO + resultFR
    let resultTotalPerIdx = resultHWPerIdx + resultCOPerIdx + resultFRPerIdx
    

    let code = `[volume:hot_examples]
path = /mnt/fast_disk
maxVolumeDataSizeMB = ` + resultHWPerIdx * 1024 + `

[volume:cold_examples]
path = /mnt/big_disk
maxVolumeDataSizeMB = ` + resultCOPerIdx * 1024;

    

    return (
        <div className="body">
            <Wrap spacing='24px' align="top" m='24px'>
                <Box>
                    <Wrap spacing='24px' >
                        {/* input data */}
                        <Card w={300}>
                            <CardHeader>
                                <Heading size='md'>Input data</Heading>
                                <Text pt='2' fontSize='sm' mb='8px'>
                                    Set input data information.
                                </Text>
                            </CardHeader>
                            <CardBody>
                                <Stack divider={<StackDivider />} spacing='4'>
                                    {/* Daily Data Box */}
                                    <Box>
                                        <Heading size='xs' textTransform='uppercase'>
                                            Daily Data Volume
                                        </Heading>
                                        <Text pt='2' fontSize='sm' mb='8px'>
                                            Enter expected amount of raw data
                                        </Text>
                                        <NumberInput
                                            onChange={(valueString) => setDDV(parseDDV(valueString))}
                                            value={formatDDV(DDV)}
                                            defaultValue={15}
                                            min={10}
                                            max={100000}
                                        >
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </Box>
                                    <Box>
                                        <Heading size='xs' textTransform='uppercase'>
                                            Raw Compression Factor
                                        </Heading>
                                        <Text pt='2' fontSize='sm' mb='8px'>
                                            Enter expected raw data compression rate
                                        </Text>
                                        <Slider
                                            onChange={(v) => setRCF(v)}
                                            onMouseEnter={() => setShowRCFTooltip(true)}
                                            onMouseLeave={() => setShowRCFTooltip(false)}
                                            defaultValue={0.3}
                                            min={0}
                                            max={3}
                                            step={0.01}
                                        >
                                            <SliderMark value={0} mt='1' fontSize='sm'>
                                                0
                                            </SliderMark>
                                            <SliderMark value={1} mt='1' fontSize='sm'>
                                                1
                                            </SliderMark>
                                            <SliderMark value={2} mt='1' fontSize='sm'>
                                                2
                                            </SliderMark>
                                            <SliderMark value={3} mt='1' ml='-2.5' fontSize='sm'>
                                                3
                                            </SliderMark>
                                            <SliderTrack>
                                                <SliderFilledTrack />
                                            </SliderTrack>
                                            <Tooltip
                                                hasArrow
                                                placement='top'
                                                isOpen={showRCFTooltip}
                                                label={`${RCF}`}
                                            >
                                                <SliderThumb boxSize={6} />
                                            </Tooltip>
                                        </Slider>
                                    </Box>
                                    <Box>
                                        <Heading size='xs' textTransform='uppercase'>
                                            Metadata Size Factor
                                        </Heading>
                                        <Text pt='2' fontSize='sm' mb='8px'>
                                            Enter expected metadata rate per raw data
                                        </Text>
                                        <Slider
                                            onChange={(v) => setMSF(v)}
                                            onMouseEnter={() => setShowMSFTooltip(true)}
                                            onMouseLeave={() => setShowMSFTooltip(false)}
                                            defaultValue={0.5}
                                            min={0}
                                            max={3}
                                            step={0.01}
                                        >
                                            <SliderMark value={0} mt='1' fontSize='sm'>
                                                0
                                            </SliderMark>
                                            <SliderMark value={1} mt='1' fontSize='sm'>
                                                1
                                            </SliderMark>
                                            <SliderMark value={2} mt='1' fontSize='sm'>
                                                2
                                            </SliderMark>
                                            <SliderMark value={3} mt='1' ml='-2.5' fontSize='sm'>
                                                3
                                            </SliderMark>
                                            <SliderTrack>
                                                <SliderFilledTrack />
                                            </SliderTrack>
                                            <Tooltip
                                                hasArrow
                                                placement='top'
                                                isOpen={showMSFTooltip}
                                                label={`${MSF}`}
                                            >
                                                <SliderThumb boxSize={6} />
                                            </Tooltip>
                                        </Slider>
                                    </Box>
                                </Stack>
                            </CardBody>
                        </Card>
                        {/* Data Retention */}
                        <Card w={300}>
                            <CardHeader>
                                <Heading size='md'>Data Retention</Heading>
                                <Text pt='2' fontSize='sm' mb='8px'>
                                    Set data retention period.
                                </Text>
                            </CardHeader>
                            <CardBody>
                                <Stack divider={<StackDivider />} spacing='4'>
                                    <Box>
                                        <Heading size='xs' textTransform='uppercase'>
                                            Hot / Warm
                                        </Heading>
                                        <Text pt='2' fontSize='sm' mb='8px'>
                                            Set hot/warm period (Fast Storage)
                                        </Text>
                                        <NumberInput
                                            onChange={(value) => setDRHW(parseDRHW(value))}
                                            value={formatDRHW(DRHW)}
                                            defaultValue={15}
                                            min={1}
                                            max={3600}
                                        >
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </Box>
                                    <Box>
                                        <Heading size='xs' textTransform='uppercase'>
                                            Cold
                                        </Heading>
                                        <Text pt='2' fontSize='sm' mb='8px'>
                                            Set Cold period (Standard Storage)
                                        </Text>
                                        <NumberInput
                                            onChange={(value) => setDRCO(parseDRCO(value))}
                                            value={formatDRCO(DRCO)}
                                            defaultValue={30}
                                            min={1}
                                            max={3650}
                                        >
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </Box>
                                    <Box>
                                        <Heading size='xs' textTransform='uppercase'>
                                            Archived (Frozen)
                                        </Heading>
                                        <Text pt='2' fontSize='sm' mb='8px'>
                                            Set Frozen period (Slow Storage)
                                        </Text>
                                        <NumberInput
                                            onChange={(value) => setDRFR(parseDRFR(value))}
                                            value={formatDRFR(DRFR)}
                                            defaultValue={365}
                                            min={0}
                                            max={3650}
                                        >
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </Box>
                                </Stack>
                            </CardBody>
                        </Card>
                        {/* Architecture */}
                        <Card w={300}>
                            <CardHeader>
                                <Heading size='md'>Architecture</Heading>
                                <Text pt='2' fontSize='sm' mb='8px'>
                                    Set indexer cluster architecture you want to build.
                                </Text>
                            </CardHeader>
                            <CardBody>
                                <Stack divider={<StackDivider />} spacing='4'>
                                    <Box>
                                        <Heading size='xs' textTransform='uppercase'>
                                            Number Of  Indexers
                                        </Heading>
                                        <Text pt='2' fontSize='sm' mb='8px'>
                                            Enter number of indexer cluster member
                                        </Text>
                                        <NumberInput
                                            onChange={(valueString) => setNOI(valueString)}
                                            value={NOI}
                                            defaultValue={5}
                                            min={1}
                                            max={100}
                                        >
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </Box>
                                    <Box>
                                        <Heading size='xs' textTransform='uppercase'>
                                            Replication Factor
                                        </Heading>
                                        <Text pt='2' fontSize='sm' mb='8px'>
                                            Enter replication factor
                                        </Text>
                                        <NumberInput
                                            onChange={(valueString) => setRF(valueString)}
                                            value={RF}
                                            defaultValue={5}
                                            min={1}
                                            max={NOI}
                                        >
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </Box>
                                    <Box>
                                        <Heading size='xs' textTransform='uppercase'>
                                            Search Factor
                                        </Heading>
                                        <Text pt='2' fontSize='sm' mb='8px'>
                                            Enter search factor
                                        </Text>
                                        <NumberInput
                                            onChange={(valueString) => setSF(valueString)}
                                            value={SF}
                                            defaultValue={5}
                                            min={1}
                                            max={RF}
                                        >
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </Box>
                                </Stack>
                            </CardBody>
                        </Card>
                    </Wrap>
                </Box>
                <Stack direction={['column', 'row']} spacing='24px'>
                    {/* Result */}
                    <Box>
                        <Card w={450}>
                            <CardHeader>
                                <Heading size='md'>Result</Heading>
                                <Text pt='2' fontSize='sm' mb='8px'>
                                    Check your results.
                                </Text>
                            </CardHeader>
                            <CardBody>
                                <Stack divider={<StackDivider />} spacing='4'>
                                    <Box>
                                        <Heading size='xs' textTransform='uppercase'>
                                            Sizing Table
                                        </Heading>
                                        <Text pt='2' fontSize='sm' mb='8px'>
                                            Splunk storage sizing table.
                                        </Text>
                                        <TableContainer>
                                            <Table variant='simple'>
                                                <Thead>
                                                    <Tr>
                                                        <Th></Th>
                                                        <Th>All Indexer</Th>
                                                        <Th>Per Indexers</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    <Tr>
                                                        <Th>Hot/Warm</Th>
                                                        <Td>{resultHW} GB</Td>
                                                        <Td>{resultHWPerIdx} GB</Td>
                                                    </Tr>
                                                    <Tr>
                                                        <Th>Cold</Th>
                                                        <Td>{resultCO} GB</Td>
                                                        <Td>{resultCOPerIdx} GB</Td>
                                                    </Tr>
                                                    <Tr>
                                                        <Th>Archived</Th>
                                                        <Td>{resultFR} GB</Td>
                                                        <Td>{resultFRPerIdx} GB</Td>
                                                    </Tr>
                                                    <Tr>
                                                        <Th>Total</Th>
                                                        <Td>{resultTotal} GB</Td>
                                                        <Td>{resultTotalPerIdx} GB</Td>
                                                    </Tr>
                                                </Tbody>
                                            </Table>
                                        </TableContainer>
                                    </Box>
                                    <Box>
                                        <Heading size='xs' textTransform='uppercase'>
                                            Config Examples
                                        </Heading>
                                        <Text pt='2' fontSize='sm' mb='8px'>
                                            Splunk indexes.conf examples.
                                        </Text>
                                        <pre>
                                            <ConfigView code={code} language='ini' />
                                        </pre>
                                    </Box>
                                </Stack>
                            </CardBody>
                        </Card>
                    </Box>
                </Stack>
            </Wrap>
        </div>
    );
}

export default Body;
