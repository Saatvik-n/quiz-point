import { useDisclosure } from '@chakra-ui/hooks';
import * as React from 'react';
import Banner from '../../Components/Homepage/Banner';
import Footer from '../../Components/Homepage/Footer';
import HomepageModal from '../../Components/Homepage/Modal/HomepageModa';
import Section1 from '../../Components/Homepage/Sections/Section1';
import Section2 from '../../Components/Homepage/Sections/Section2';
import Navbar from '../../Components/Navbar/Navbar';
export interface HomepageProps {
  
}
 
const Homepage: React.FC<HomepageProps> = () => {

  const {isOpen, onOpen, onClose} = useDisclosure()

  return (  
    <>
      <Navbar />
      <HomepageModal
      isOpen={isOpen}
      onClose={onClose}
      />
      <Banner onOpen={onOpen} />
      <Section1 />
      <Section2 />
      <Footer />
    </>
  );
}
 
export default Homepage;