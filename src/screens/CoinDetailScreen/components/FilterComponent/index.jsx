import React, { memo } from "react"
import { Text, Pressable } from 'react-native'
import styles from "./styles"

const FilterComponent = (props) => {
    const { filterDay, filterText, selectRange, setSelectRange } = props
    const isFilterSelected = (filter) => filter === selectRange
    return (
      <Pressable 
        style={{
          ...styles.textContainer,
          backgroundColor: isFilterSelected(filterDay) ? "#1e1e1e" : "transparent"
        }}
        onPress={() => setSelectRange(filterDay)}
      >
        <Text 
          style={{
            ...styles.filterText,
            color: isFilterSelected(filterDay) ? "white" : "grey"
          }}
        >
          {filterText}
        </Text>
      </Pressable>
    )
}

export default memo(FilterComponent)