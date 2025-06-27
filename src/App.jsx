
import { Box,Snackbar } from '@mui/material'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import { MENU } from './menu.js';
import Clock from './function/ClockFunction.jsx'


function App() {


  const [pickedMenu, setPickedMenu] = useState([]);
  

  const [totalPrice,setTotalPrice ] = useState(0);
  const [totalAmount,setTotalAmount ] = useState(0);

  const[selectedTopic,setSelectedTopic] = useState([{
    topic : '즐겨찾기',
    selected : 1,
  },
  {
    topic : '에스프레소',
    selected : 0,
  },
  {
    topic : '블렌디드',
    selected : 0,
  },
  {
    topic : '피지오/기타',
    selected : 0,
  },
  {
    topic : '푸드',
    selected : 0,
  },
  ]);

  const [topic,setTopic] = useState('즐겨찾기');

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // -------------------------------------기능 함수-----------------------------------------
  // 실시간 구매 리스트에서 메뉴 정보 변경시 총 가격, 총 잔수 변경
  useEffect(() => {
    getTotalPrice();
    getTotalAmount();
  },[pickedMenu])

  // 같은 메뉴가 있을 시 +1만 해주는 함수
  function updateItem (item)  {  
  setPickedMenu(prev => 
    prev.map(menu =>
      menu.name === item.name && menu.temperture === item.temperture && menu.size === item.size ? {...menu, amount : menu.amount + 1} : menu
    )
  )
}

// totalPrice 구하는 기능
function getTotalPrice(){
  const ttp = pickedMenu.reduce((total,menu) => total + menu.amount * menu.price,0)
  setTotalPrice(ttp);
}

// totalAmount 구하는 기능
function getTotalAmount(){
  const tta= pickedMenu.reduce((total,menu) => total + menu.amount, 0)
  const fa = pickedMenu.reduce((total,menu) => menu.category.includes('푸드') ? total + menu.amount : total,0)
  const num = tta - fa;
  setTotalAmount(num);
}

// 구매 리스트 전체 삭제
function deletePickedMenu(){
  setPickedMenu([]);
}

// 실시간 구매 리스트에서 최근에 추가된 메뉴가 선택된 상태로 변경하는 함수
const firstSelected = () =>{
  setPickedMenu(prevMenu => prevMenu.map((menu,index) => 
  index === 0 ? {...menu,selected : 1} : {...menu,selected : 0}))
}

// 선택 삭제 기능
function selectedDelete(){
  setPickedMenu(prevMenus => prevMenus.filter(item => item.selected !== 1))
}

// 실시간 구매 리스트 클릭했을때 선택된 메뉴 변경
function clickSelected (item)  {
  setPickedMenu(prevMenu => prevMenu.map((menu) => 
  menu === item ? {...menu,selected : 1} : {...menu,selected : 0}))
}

// 카테고리 리스트 클릭했을때 선택된 카테고리 변경
function clickCategory (item)  {
  setTopic(item.topic);
  setSelectedTopic(prevMenu => prevMenu.map((category) => 
  category.topic === item.topic ? {...category,selected : 1} : {...category,selected : 0}))
}

// 선택된 메뉴 음료 잔 수 증가(+) 기능
function selectedMenuIncrease(){
  setPickedMenu(prevMenu => prevMenu.map((menu) => 
  menu.selected === 1 ? {...menu, amount : menu.amount+1} : {...menu, amount : menu.amount}))
}

// 선택된 메뉴 음료 잔 수 감소(-) 기능
function selectedMenudecrease(){
  setPickedMenu(prevMenu => prevMenu.map((menu) => 
  menu.selected === 1 ? {...menu, amount : Math.max(1, menu.amount - 1)} : {...menu, amount : menu.amount}))
}

// 선택된 메뉴 음료 사이즈 변경(T)
function changeSizeT() {
  setPickedMenu(prevMenu =>
    prevMenu.map(menu => {
      if (menu.selected === 1) {
        if (menu.size === 'G') {
          return { ...menu, size: 'T', price: menu.price - 600 };
        } else if (menu.size === 'V') {
          return { ...menu, size: 'T', price: menu.price - 1400 };
        }
      }
      return { ...menu, size: menu.size };
    })
  );
}

// 선택된 메뉴 음료 사이즈 변경(G)
function changeSizeG(){
  setPickedMenu(prevMenu =>
    prevMenu.map(menu => {
      if (menu.selected === 1) {
        if (menu.size === 'T') {
          return { ...menu, size: 'G', price: menu.price + 600 };
        } else if (menu.size === 'V') {
          return { ...menu, size: 'G', price: menu.price - 800 };
        }
      }
      return { ...menu, size: menu.size };
    })
  );
}

// 선택된 메뉴 음료 사이즈 변경(V)
function changeSizeV(){
  setPickedMenu(prevMenu =>
    prevMenu.map(menu => {
      if (menu.selected === 1) {
        if (menu.size === 'G') {
          return { ...menu, size: 'V', price: menu.price + 800 };
        } else if (menu.size === 'T') {
          return { ...menu, size: 'V', price: menu.price + 1400 };
        }
      }
      return { ...menu, size: menu.size };
    })
  );
}

// 선택된 메뉴 음료 온도 변경(Hot)
function changeTempH(){
  setPickedMenu(prevMenu => prevMenu.map((menu) => 
  menu.selected === 1 && !menu.iceOnly && menu.temperture === 'ice' ? {...menu, temperture : 'hot'} : {...menu, temperture : menu.temperture }))
}

// 선택된 메뉴 음료 온도 변경(Ice)
function changeTempI(){
  setPickedMenu(prevMenu => prevMenu.map((menu) => 
  menu.selected === 1 && menu.temperture === 'hot' ? {...menu, temperture : 'ice'} : {...menu, temperture : menu.temperture}))
}
  
  // 메뉴 클릭했을 때 고른 메뉴를 왼쪽 화면에 띄우는 함수(setPickedMenu를 통해 배열에 저장후 리렌더링)
  const handlePickedMenu = (item) => {
    if(pickedMenu.some(menu => menu.name === item.name && menu.temperture === item.temperture && menu.size === item.size)){
        updateItem(item)
    }else{
      setPickedMenu((pickedMenu) => [item,...pickedMenu])
      firstSelected()
    }
  }
// ---------------------------------------기능 함수------------------------------------
  return (
    <Box sx={{display : 'flex', backgroundColor : '#81C784', width : '95%', height : '100%',margin : 0, padding : 2, fontFamily: 'Montserrat, sans-serif'}}>
      <Box sx={{display : 'block', justifyContent : 'space-between', width : '400px', height : '90%', maxHeight : "100%", backgroundColor : '#fff',padding : 2, borderRadius : '10px'}}>
       <Box sx={{fontSize : '30px', textAlign : 'center', borderBottom : '1px dashed black', marginBottom : '10px'}}>
        CafePos
        <Clock/>
       </Box>
        <Box sx={{height : '70%',width : '100%'}}>
          {pickedMenu.map((item,index) => 
          <Box onClick={() => clickSelected(item)} key={index} sx={{display : 'flex', cursor : 'pointer', backgroundColor : item.selected === 1 ? '#81C784':'', padding : '5px', borderRadius : '10px'}}>
            {item.temperture === 'ice' ? <span style={{width : '20px'}}>I</span> : null}
            {item.temperture === 'hot' ? <span style={{width : '20px'}}>H</span> : null}
            <span style={{width : '200px'}}>{item.name}</span>
            <span style={{width : '60px'}}>{item.amount}</span>
            <span style={{width : '80px'}}>{item.size}</span>
            
            <Box sx={{display : 'flex', width : '15px', height : '15px', margin : '0',padding : '0',textAlign : 'center', color : 'red'}} onClick={selectedDelete}>
              x
            </Box>

          </Box>
          )}
        </Box>
        <Box sx={{display : 'flex', width : '400px', padding : '5px', alignContent : 'center'}}>
          <Button sx={{   width : '100px', height : '60px', color : 'black',margin : '5px'}} onClick={deletePickedMenu}>전체 삭제</Button>
          <Button sx={{   width : '100px', height : '60px', color : 'black',margin : '5px'}} onClick={selectedDelete}>선택 삭제</Button>
          <Button sx={{   width : '100px', height : '60px', color : 'black',margin : '5px'}} onClick={selectedMenuIncrease}>+</Button>
          <Button sx={{   width : '100px', height : '60px', color : 'black',margin : '5px'}} onClick={selectedMenudecrease}>-</Button>
          
          
        </Box>
        <Box sx={{display : 'flex',  backgroundColor : '#A0D468', justifyContent : 'space-between', padding : '5px', borderRadius : '10px'}}>
          <Box>
            {totalAmount}잔
          </Box>
          <Box>
            {totalPrice.toLocaleString()}원
          </Box>
        </Box>
      </Box>
      <Box sx={{width : '8%', display : 'block', alignContent : 'center', textAlign : 'center'}}>
        <Button sx={{   width : '90%', height : '60px', color : 'black',margin : '2px',borderRadius : '10px', backgroundColor : 'white'}} onClick={changeTempH}>Hot</Button>
        <Button sx={{   width : '90%', height : '60px', color : 'black',margin : '2px',borderRadius : '10px', backgroundColor : 'white'}} onClick={changeTempI}>Ice</Button>
        <Button sx={{   width : '90%', height : '60px', color : 'black',margin : '2px',borderRadius : '10px', backgroundColor : 'white'}} onClick={changeSizeT}>T</Button>
        <Button sx={{   width : '90%', height : '60px', color : 'black',margin : '2px',borderRadius : '10px', backgroundColor : 'white'}} onClick={changeSizeG}>G</Button>
        <Button sx={{   width : '90%', height : '60px', color : 'black',margin : '2px',borderRadius : '10px', backgroundColor : 'white'}} onClick={changeSizeV}>V</Button>
      </Box>
      <Box>
        <Box>
          {selectedTopic.map((topic,idx) => 
            <Button key={idx} onClick={() =>clickCategory(topic)} sx={{borderTopRightRadius : '10px', borderTopLeftRadius : '10px', backgroundColor : topic.selected === 1 ? '#81C784':'white', width : '100px', height : '50px'}}>{topic.topic}</Button>
          )}
        </Box>
        <Box sx={{display : 'flex',flexWrap : 'wrap', backgroundColor : 'white', borderBottomLeftRadius : '10px', borderBottomRightRadius : '10px', width : '500px', height : '88%', alignContent : 'flex-start'}}>
          {MENU.map((item,idx) => 
          item.category.includes(topic) ? 
          <Button key={idx} sx={{display : 'block', width : '100px', height : '75px', borderRadius : '10px',backgroundColor: '#81C784', margin : '4px',  }} onClick={() => handlePickedMenu(item)}>
            <Box sx={{height : '80%'}}>{item.name}</Box>
            <Box sx={{fontSize : '10px', width : '100%', textAlign : 'right'}}>{item.price}원</Box>
        </Button>
        : null
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default App


