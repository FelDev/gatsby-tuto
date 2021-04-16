import { useState } from 'react';

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);
  function updateValue(e) {
    // check if it's a number
    let { value } = e.target;
    if (value === 'number') {
      value = parseInt(value);
    }
    setValues({
      // copy the existing value into it
      ...values,
      // update the new values that changed
      [e.target.name]: value,
    });
  }
  return { values, updateValue };
}
