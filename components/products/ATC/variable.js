import { useState, useEffect } from 'react';

export default function VariableATC({ variations, product }) {
  const [cartValue, setCartValue] = useState({
    product_id: null,
    variation_id: null,
    quantity: 1,
  });
  const [reducedVariations, setVariations] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [selectedAttributeIndex, setSelectedAttributeIndex] = useState(0);
  const [variation, setVariation] = useState(false);

  useEffect(async () => {
    const attributes = [];

    product.attributes.forEach((attribute) => {
      if (attribute.variation && attribute.visible) {
        let obj = { key: attribute.name, value: attribute.options };
        let attr = selectedAttributes;
        attr[attribute.name] = { selected: false, value: null };
        attributes.push(obj);
      }
    });

    setVariations(attributes);
  }, []);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setCartValue({
      ...cartValue,
      [name]: value,
    });
  }

  async function handleSelectChange(e, index) {
    const { name, value } = e.target;

    // set selected attribute
    let attr = JSON.parse(JSON.stringify(selectedAttributes));
    attr[name] = { selected: true, value: value };
    setSelectedAttributes(attr);
    setSelectedAttributeIndex(index + 1);

    if (index == 0) {
      filterOptions(name, value, index + 1);
    }

    if (index == 1) {
      // find variation
      findVariation(attr);
    }
  }

  function filterOptions(name, value, newIndex) {
    //get valid options for next attributes
    const newAttributes = JSON.parse(JSON.stringify(reducedVariations));

    newAttributes[newIndex].value = [];

    variations.forEach((variation) => {
      variation.attributes.forEach((attribute) => {
        if (attribute.name == name && attribute.option == value) {
          variation.attributes.forEach((var_attribute) => {
            if (var_attribute.name != name) {
              if (newAttributes[newIndex].value.length < 1) {
                newAttributes[newIndex].value = [var_attribute.option];
              } else {
                if (
                  !newAttributes[newIndex].value.includes(var_attribute.option)
                ) {
                  newAttributes[newIndex].value = [
                    ...newAttributes[newIndex].value,
                    var_attribute.option,
                  ];
                }
              }
            }
          });
        }
      });
    });

    setVariations(newAttributes);
  }

  function findVariation(attr) {
    variations.forEach((item) => {
      const value_one = item.attributes[0];
      const value_two = item.attributes[1];
      // console.log(attr[value_one.name], attr[value_two.name], 'findVariation');

      if (
        value_one.option == attr[value_one.name].value &&
        value_two.option == attr[value_two.name].value
      ) {
        // console.log(item);
        setVariation(item);
      }
    });
  }

  function ATC() {
    setCartValue({
      ...cartValue,
      product_id: product.id,
      variation_id: variation.id,
    });
  }

  //
  return (
    <div className='variable w-full'>
      <div className='mb-6'>
        {reducedVariations.map((attribute, index) => (
          <label
            key={'_product_varation_' + index}
            className=''
            htmlFor={attribute.key}>
            {attribute.key}
            <select
              defaultValue=''
              onChange={(e) => handleSelectChange(e, index)}
              name={attribute.key}
              className='px-4 py-2 outline-none block w-full border border-gray-200 rounded-xl mt-2'>
              <option value=''>Please select an option</option>
              {index <= selectedAttributeIndex
                ? attribute.value.map((option) => (
                    <option
                      key={option + '_product_varation_option'}
                      value={option}>
                      {option}
                    </option>
                  ))
                : null}
            </select>
          </label>
        ))}
      </div>

      <div className=' atc '>
        <input
          type='number'
          className='quantity-select'
          step='1'
          min='1'
          max={variation ? variation.stock_quantity : 1}
          name='quantity'
          title='Qty'
          size='4'
          placeholder='1'
          inputMode='numeric'
          value={cartValue.quantity}
          onChange={(e) => handleInputChange(e)}
        />
        <button
          onClick={() => ATC()}
          disable={!variation ? 'true' : 'false'}
          className={`${!variation ? 'opacity-50' : null}` + ' btn-primary'}>
          Add to cart
        </button>
      </div>
      {variation ? (
        <p className='error mb-6'>
          {variation.stock_quantity} Items left in Stock
        </p>
      ) : null}
      {variation ? (
        <small>SKU: {variation.sku != '' ? variation.sku : product.sku}</small>
      ) : null}
    </div>
  );
}
