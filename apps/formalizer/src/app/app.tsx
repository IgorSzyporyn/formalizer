import { ClientModel } from '@formalizer/core';
import { Designer } from '@formalizer/designer';

export function App() {
  const model: ClientModel = {
    name: 'my-project',
    type: 'root',
    items: [
      {
        name: 'my-form',
        type: 'form',
        title: 'Form #1',
        items: [
          {
            name: 'details',
            type: 'group',
            title: 'Personals',
            items: [
              {
                name: 'firstname',
                type: 'text',
                title: 'First Name',
              },
              {
                name: 'lastname',
                type: 'text',
                title: 'Last Name',
              },
              {
                name: 'gender',
                type: 'options',
                title: 'Gender',
                options: ['Female', 'Male', 'Other'],
              },
              {
                name: 'dob',
                type: 'date',
                title: 'Date of Birth',
              },
            ],
          },
          {
            name: 'address',
            type: 'object',
            title: 'Address',
            items: [
              {
                name: 'streetname',
                type: 'text',
                title: 'Street Name',
                fullWidth: true,
              },
              {
                name: 'zipcode',
                type: 'text',
                title: 'Zipcode',
                inline: true,
              },
              {
                name: 'city',
                type: 'text',
                title: 'City',
                fullWidth: true,
              },
            ],
          },
        ],
      },
    ],
  };

  return <Designer model={model} />;
}

export default App;
