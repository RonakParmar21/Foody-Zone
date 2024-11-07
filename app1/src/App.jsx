import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResult from "./components/SearchResult";

export const BASE_URL = "http://localhost:9000";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filterData, setFilterData] = useState(null);
  const [selectedButton, setSelectedButton] = useState("all");

  useEffect(() => {
    const fetchFood = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL);
        const json = await response.json();
        setData(json);
        setFilterData(json);
        setLoading(false);
      } catch (error) {
        setError("Unable to fetch data");
      }
    };

    fetchFood();
  }, []);

  console.log(data);

  const searchFood = (e) => {
    const searchValue = e.target.value;

    console.log(searchValue);

    if (searchValue === "") {
      setFilterData(null);
    }

    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    setFilterData(filter);
  };

  const filteredFood = (type) => {
    if (type === "all") {
      setFilterData(data);
      setSelectedButton("all");
      return;
    }
    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilterData(filter);
    setSelectedButton(type);
  };

  const filterButtons = [
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
  ];

  if (error) return <div>{error}</div>;

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="./logo.svg" alt="logo" />
          </div>

          <div className="search">
            <input onChange={searchFood} placeholder="Search Food..." />
          </div>
        </TopContainer>

        <FilterContainer>
          {
            filterButtons.map((value) => (
              <Button isSelected = {selectedButton === value.type} key={value.name} onClick={() => filteredFood(value.type)}>{value.type}</Button>
            ))
          }
          
        </FilterContainer>
      </Container>
      <SearchResult data={filterData} />
    </>
  );
};

export default App;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const TopContainer = styled.div`
  min-height: 140px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;

  .search {
    input {
      background: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;
    }
  }

  @media (0 < width < 600px) {
    flex-direction: column;
    min-height: 120px;
  }
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-bottom: 40px;
`;

export const Button = styled.button`
  background-color: ${({isSelected})=> isSelected ? "#f22f2f" : "#ff4343"};
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  cursor: pointer;
  color: white;

  &:hover {
    background-color: #f22f2f;
  }
`;
