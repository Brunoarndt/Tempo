import { Card, CardBody, Flex, Text, Stack, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionCard = motion(Card);

export default function WeatherCard({ data }) {
  if (!data) {
    return (
      <Text>Nenhum dado climático disponível</Text>
    );
  }

  return (
    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      maxW="400px"
      boxShadow="2xl"
    >
      <CardBody border='rounded'>
        <Text fontSize="2xl" align='center'>{data.name}</Text>
        <Flex align="center" justify="center" gap={4}>
          <Text fontSize="4xl">
            {Math.round(data.main.temp)}°C
          </Text>
          {data.weather?.[0]?.icon && (
            <Image
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
              alt={data.weather[0]?.description || "Ícone do clima"}
              w="100px"
              h="100px"
            />
          )}
        </Flex>

        <Stack spacing={1}>
          <Text>Vento: {data.wind?.speed || "--"} km/h</Text>
          <Text>Umidade: {data.main?.humidity || "--"}%</Text>
        </Stack>
      </CardBody>
    </MotionCard>
  );
}