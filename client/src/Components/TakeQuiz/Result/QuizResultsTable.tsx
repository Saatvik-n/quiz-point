import { Table, TableCaption, Td, Thead, Tbody, Th, Tr, Tfoot } from "@chakra-ui/react";
import * as React from "react";

export interface QuizResultsTableProps {
  singleOptionQs: number;
  multipleChoiceQs: number;
  flashcardQs: number;
  correctSingle: number;
  correctMultiple: number;
  correctFlash: number;
}

const QuizResultsTable: React.FC<QuizResultsTableProps> = (props) => {

  const {singleOptionQs, multipleChoiceQs, flashcardQs, correctSingle, correctMultiple, correctFlash} = props

  return (
    <>
      <Table variant="simple" w={{ base: "500px", md: "700px" }} size="lg">
        <Thead>
          <Tr>
            <Th> Question Type </Th>
            <Th> Correct Answers </Th>
            <Th> Total Questions </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td> Single Option </Td>
            <Td> {correctSingle
            } </Td>
            <Td> {singleOptionQs} </Td>
          </Tr>
          <Tr>
            <Td> Multiple Choice </Td>
            <Td> {correctMultiple} </Td>
            <Td> {multipleChoiceQs} </Td>
          </Tr>
          <Tr>
            <Td> Flashcard </Td>
            <Td> {correctFlash} </Td>
            <Td> {flashcardQs} </Td>
          </Tr>
        </Tbody>
        <Tfoot fontSize="16px">
          <Tr>
            <Th> Total </Th>
            <Th> {correctFlash + correctSingle + correctMultiple} </Th>
            <Th> {singleOptionQs + multipleChoiceQs + flashcardQs} </Th>
          </Tr>
        </Tfoot>
      </Table>
    </>
  );
};

export default QuizResultsTable;
