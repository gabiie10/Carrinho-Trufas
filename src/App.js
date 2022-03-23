//CSS
import './App.css';
//Hooks e afins
import { useState,useEffect } from 'react';
import axios from 'axios';
//'containers
import { Card } from './components/card/Card';
import { Container } from './components/container/Container';
import { Details } from './components/details/Details';
//Botao
import { Button } from './components/button/Button';
//Resultado
import { Frete } from './components/frete/Frete';
import { Box_result } from './components/box-result/Box_result';
//H2
import { H2_frete } from './components/frete/h2/H2_frete';
import { H2_price } from './components/H2prices/H2_price';
import { H2_disablePrice } from './components/H2prices/H2_disablePrice';
import { H2_result } from './components/box-result/H2_result';
import { Error } from './components/error/Error';
//NOTA:NÃO RECEBI A API POR ISSO ESTOU USANDO MOCK E USANDO OUTRAS IMAGEMS.
function App() {
  const [text,setText]=useState([]);
  const [error,setError]=useState(false);

  useEffect(()=>{
    axios.get('http://localhost:3133/Trufas')
    .then((response)=>{
      setText(response.data);
    })
    .catch(
      (error)=>{
        setError(true)
      }
    )
  },[]);

 var Total=text.reduce((sum,
    text)=>{
      return sum + text.price;
   },0);

  return (<>
    {error?(
    <Error/>
  ):(
    <div className="App"> 
        <Container>
          <header>
            Meu carrinho
          </header>
          <div className='container-2'>       
            {text.map((text)=>(        
              <Card >
                <div className='img'><img src={text.imagem} witdh="300px" height="120px" alt={text.name}/></div>
                <Details>
                    <div><h2 className='title'>{text.name}</h2></div>
                  <div className='card-container'>
                    <div className='price-disable'>    
                      <H2_disablePrice> R$ {text.oldPrice}</H2_disablePrice>
                    </div>
                    <div className='price'>
                      <H2_price> R$ {text.price}</H2_price>
                    </div>
                  </div>
                </Details>
              </Card>
            ))}
          </div>
          <div className='result'>
            <Box_result>
                    <div><H2_result>Total</H2_result></div>
                    <div><H2_result>R${Total}</H2_result></div>
            </Box_result>
            {Total>10 &&(
                <Frete>
                  <H2_frete>Parabéns, sua compra tem frete grátis !</H2_frete>  
                </Frete>
            )}   
          </div>
          <div className='container-3'>
            <Button>
              Finalizar compra
            </Button>
          </div>        
        </Container>     
      </div>
      )} 
       </>
  );
}

export default App;
