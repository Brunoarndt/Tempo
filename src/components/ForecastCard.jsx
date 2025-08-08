import { Card, CardBody, Flex, Text, Image, Stack } from "@chakra-ui/react";

export default function ForecastCard({ day }) {
  if (!day) {
    return (
      <Card
        mx="auto"
        boxShadow="md"
      >
        <CardBody>
          <Text align="center">Nenhum dado disponível</Text>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card
      boxShadow="2xl"
      m={1}
    >
      <CardBody>
        <Text fontSize="lg" align="center" mb={2}>
          {day.date}
        </Text>

        <Flex justify="center" mb={2}>
          <Image
            src={`https://openweathermap.org/img/wn/${day.icon}@4x.png`}
            alt={day.condition}
            w="80px"
            h="80px"
          />
        </Flex>

        <Stack spacing={1} textAlign="center">
          <Text>Mínimas: {day.min}°C</Text>
          <Text>Máximas: {day.max}°C</Text>
        </Stack>
      </CardBody>
    </Card>
  );
}
