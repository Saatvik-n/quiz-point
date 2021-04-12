import * as React from "react"



import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import Homepage from "./Containers/Homepage/Homepage"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Homepage />
  </ChakraProvider>
)
