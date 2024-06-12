import React, { useState } from "react";
import classes from "./FilterComponent.module.css";
import { Select, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./index.css";
import useWindowWidth from "../../../components/useWindowWidth";

const { Option } = Select;


function FilterComponent({
  setSearchData,
  searchArray,
  searchLoading,
  setSearchValue,
  searchValue,
  fetchSeriesOnSearch,
  page,
}) {
  const [searchVisible, setSearchVisible] = useState(false);
  const width = useWindowWidth();
  const [flag, setFlag] = useState(false);

  const handleSearchClick = () => {
    setSearchVisible(!searchVisible);
  };

  const handleSearch = async (value) => {
    setSearchData(value); // Update search data state
    // Perform your data fetching based on the search query (value)
    // Example: Fetch data from server based on value and update options state
    // const newData = await fetchDataFromServer(value);
    // setOptions(newData);
  };

  return (
    <>
    <div className="navbar-container">
      <div className={`select-container`}>
        <Select
          className={classes.filterSelect}
          style={{ flex: 1, marginRight: "1rem" }}
          placeholder="Language"
        >
          <Option value="option1">Option 1</Option>
          <Option value="option2">Option 2</Option>
        </Select>
        <Select
          className={classes.filterSelect}
          style={{ flex: 1, marginRight: "1rem" }}
          placeholder="Genre"
        >
          <Option value="option1">Option 1</Option>
          <Option value="option2">Option 2</Option>
        </Select>
        {width> 800 && (
        <Button
          classname={classes.filterButton}
          type="text"
          icon={<SearchOutlined />}
          onClick={handleSearchClick}
        />
      )}
      {width > 800 && (
        <Select
          loading={searchLoading}
          value = {searchValue}
          showSearch
          onChange={(value) => setSearchValue(value)}
          onSearch={handleSearch}
          className={classes.filterSelect}
          style={{ flex: 2, marginRight: "1rem" }}
          placeholder="Enter a minimum of 2 Characters..."
          open={searchArray.length !== 0}
        >
          {searchArray?.map((item) => (
            <Option value={item.name}>{item.name}</Option>
          ))}
        </Select>
        )}
        {width > 800 && (
          <>
        <Button onClick={fetchSeriesOnSearch} className="search-button-web">
          Search
        </Button>
        <Button onClick={() => setSearchValue(undefined)} className="clear-button-web">
        Clear
      </Button>
      </>
        )} 
        
      </div>
      
      {/* <div className="search-container"> */}
    </div>
    {/* {width < 800 && (
    <div className={classes.twoButtons}>
    <Button onClick={() => {
      setFlag(true)
      fetchSeriesOnSearch()}} className="search-button">
  Search
</Button>
  <Button onClick={() => setSearchValue("")} className="clear-button">
  Clear
</Button>
</div>
    )} */}
</>
  );
}

export default FilterComponent;
