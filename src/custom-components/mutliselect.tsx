import React, { useState } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';

type OptionType = {
  name: string;
  id: number;
};

const CustomMultiSelect: React.FC = () => {
  const [options, setOptions] = useState<OptionType[]>([
    { name: 'Option 1', id: 1 },
    { name: 'Option 2', id: 2 },
  ]);
  const [selectedValues, setSelectedValues] = useState<OptionType[]>([]);

  const onSelect = (selectedList: OptionType[], selectedItem: OptionType) => {
    setSelectedValues(selectedList);
  };

  const onRemove = (selectedList: OptionType[], removedItem: OptionType) => {
    setSelectedValues(selectedList);
  };

  const onCreate = (query: string) => {
    const newItem = { name: query, id: options.length + 1 };
    setOptions([...options, newItem]);
    setSelectedValues([...selectedValues, newItem]);
  };

  return (
    <div style={{
        width: '100%',
        zIndex: 100,
    }}>
      <Multiselect
        options={options}
        selectedValues={selectedValues}
        onSelect={onSelect}
        onRemove={onRemove}
        displayValue="name"
        closeIcon="cancel"
        placeholder="Select or create an option"
        style={{
          chips: { background: '#1e90ff' },
          searchBox: { border: 'none', borderBottom: '1px solid blue', borderRadius: '0px' },
        }}
      />
      <button onClick={() => onCreate(prompt('Enter new option') || '')}>Create New</button>
    </div>
  );
};

export default CustomMultiSelect;
