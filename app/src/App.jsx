import styled from "styled-components";
import { useState, useEffect} from "react";
import SearchResult from "./components/SearchResult";

export const BASE_URL = "http://localhost:9000";
const App = () => {

  const [data, setData] = useState(null);
  const [filterData , setFilterData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");



  useEffect(()=>{
    const fetchFoodData = async ()=>{
      try {
        setLoading(true);
        const response= await fetch(BASE_URL);
        const json = await response.json();
        
        setData(json);
        setFilterData(json)
        setLoading(false);
      } catch (error) {
        setError("Unable to fetch data");
      }
    };
    fetchFoodData();
  },[]);

  const searchFood = (e) =>{
    const searchValue= e.target.value;
    console.log(searchValue);

      if(searchValue === ""){
        setFilterData(null);
      }

      const filter = data?.filter((food)=>food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilterData(filter);
  };

  const filterFood=(type)=>{
    if(type === "all"){
      setFilterData(data)
      setSelectedBtn("all")
      return;
    }
    const filterType = data?.filter((food)=>food.type.toLowerCase().includes(type.toLowerCase())
  );
  setFilterData(filterType);
  setSelectedBtn(type);
  };

  const filterBtns = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ]
   
  // console.log(data)
  if(error) return <div>{error}</div>
  if(loading) return <div>loading...</div>
  
  return <>
  <Container>
    <TopContainer>
      <div className="logo">
        <img src="/Foody Zone.png" alt="logo"/>
      </div>

      <div className="search">
        <input onChange={searchFood} placeholder="Search food"/>
      </div>
    </TopContainer>

    <FilterContainer>
      {filterBtns.map((value) =>(
        <Button key={value.name} onClick={()=> filterFood(value.type)}>{value.name}</Button>
      ))}
      
    </FilterContainer>

   
  </Container>
  <SearchResult data={filterData}/>
  </>
};

export default App;

 export const Container = styled.div`
max-width:1200px;
margin: 0 auto;
`;
const TopContainer = styled.section`
height:100px;
display:flex;
justify-content:space-between;
padding:16px;

.search{
  input{
    background-color:transparent;
    border:1px solid red;
    color:white;
    border-radius:5px;
    height:40px;
    font-size: 16px;
    padding: 0 10px;
  }
}
@media (0 < width < 600px){
  flex-direction: column;
  height:120px;
}
`;
const FilterContainer=styled.section`
display: flex;
justify-content:center;
gap:12px;
padding-bottom:20px;
`;

export const Button = styled.button`
background-color:red;
color:white;
border-radius:5px;
padding:6px 12px;
border:none;
cursor:pointer;
&:hover{
  background-color: #cc1e1e;
}`;

