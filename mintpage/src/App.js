import React, { useEffect, useRef, useState } from "react";
import {
  getProvider,
  getSigner,
  getTotalSupply,
  getAddress,
  setContract,
  _Mint,
} from "./Component/Ether";
import {
  CenterContainer,
  Container,
  Button,
  MainSectionContainer,
  Flex,
  Block,
  Content,
  BackGroundImage,
  ContentBlurLess
} from "./generalStyledComponent/general.style";
import "./index.css";
import background from "./resource/PixelverseBackground.jpg";

const App = () => {
  const [contract, _setContract] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [login, setLogin] = useState(null);
  const [totalSupply,setTotalSupply] = useState(0);
  const [quantity,setQuantity] = useState(1);
  const initialRef = useRef(true);

  useEffect(() => {
    const task = async () => {
      await getAddress().then((res) => {
        setWalletAddress(res);
        console.log("getting address");
      });
      console.log("got address");

      await getProvider().then((res) => {
        setProvider(res);
        console.log("getting provider");
      });
      console.log("got provider");

      await getSigner().then((res) => {
        setSigner(res);
        console.log("getting singer");
      })
      console.log("got signer");


    

    };
    if(initialRef.current && window.ethereum)
    task();

    // setContract().then()
  }, []);

  useEffect(() => {

    setContract(signer).then((res) => {
      _setContract(res);
    })

  }, [signer]);

  useEffect(()=>{

    let cleanupFlag = true;
    const fetechData = async()=>{

      await getTotalSupply(contract).then(resp=>{
        setTotalSupply(resp)
        console.log('getting total supply',resp)
      })
      console.log('got total supply')

    }
    
    setTimeout(()=>{
      if(cleanupFlag && window.ethereum)
      fetechData()
    },500)
   

    return ()=>{
      cleanupFlag = false; 
    }

  },[contract])

  const updateQuantity =(flag)=>{

    if(flag){
      if(quantity < 15)
      setQuantity(quantity+1);
    }else{
      if(quantity > 1 )
      setQuantity(quantity-1);
    }

  }
  const Mint = ()=>{
    if(contract && quantity && window.ethereum)
    _Mint(contract,quantity).then(res=>{
      console.log(res)
    })
  }

  return (
    <MainSectionContainer style={{ flexDirection: "column" }}>
      <CenterContainer>
        <BackGroundImage src={background} />
      </CenterContainer>

      <Flex
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CenterContainer style={{ alignContent: "center" }}>
          <Flex style={{ padding: "20px 30px" }}>
            <Container>
              <Flex style={{ padding: "20px 50px",flexDirection: "column", alignContent: "center" ,backdropFilter:'blur(10px)',background:'rgba(184, 184, 184, 0.17)' }}>
                <CenterContainer>
                  <ContentBlurLess style={{fontSize:'25px'}}>Quantity</ContentBlurLess>
                </CenterContainer>

                <Flex style={{alignItems:'center'}}>
                <div>
                    <CenterContainer>
                  <Content style={{color:'white',background:'black'}} onClick={()=>updateQuantity(false)}>-</Content>

                    </CenterContainer>
                  </div>
               
                  <ContentBlurLess style={{color:'white',fontSize:'120px',fontWeight:'800'}} >{quantity}</ContentBlurLess>
                  <div>
                    <CenterContainer>
                  <Content style={{color:'white',background:'black'}} onClick={()=>{updateQuantity(true)}}>+</Content>

                    </CenterContainer>
                  </div>
                
                </Flex>

                <CenterContainer>
                <ContentBlurLess style={{fontSize:'25px'}}>Price</ContentBlurLess>
                </CenterContainer>

                <CenterContainer>
                <ContentBlurLess style={{fontSize:'35px',color:'white'}}>10<p style={{color:'black'}}>{" "}ETH</p></ContentBlurLess>
                </CenterContainer>

                <CenterContainer>
                <ContentBlurLess style={{fontSize:'25px'}}>Minted</ContentBlurLess>
                </CenterContainer>

                <CenterContainer>
                <ContentBlurLess style={{fontSize:'35px',color:'white'}}>{totalSupply}<p style={{color:'black'}}>/10k</p></ContentBlurLess>
                </CenterContainer>

                <CenterContainer style={{padding:'40px 0 0 0'}}>
                  <Button style={{background:'black',color:'white'}} onClick={Mint}>
                    Mint
                  </Button>
                </CenterContainer>
                
              </Flex>
            </Container>
          </Flex>
        </CenterContainer>
      </Flex>
    </MainSectionContainer>
  );
};

export default App;
