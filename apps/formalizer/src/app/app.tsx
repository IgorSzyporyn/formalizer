import { ClientModel } from '@formalizer/core';
import { Designer } from '@formalizer/designer';

export function App() {
  const model: ClientModel = {
    name: 'root',
    type: 'root',
    title: 'Form Project',
    items: [
      {
        name: 'personalInformation',
        type: 'form',
        title: 'Personal Information Form',
        description: 'Please fill in your personal details',
        items: [
          {
            name: 'nationality',
            type: 'radiogroup',
            title: 'Nationality',
            items: [
              {
                type: 'radioItem',
                name: 'danish',
                title: 'Danish',
              },
              { type: 'radioItem', name: 'other', title: 'Other' },
            ],
          },
          {
            name: 'fullName',
            type: 'group',
            title: 'Full Name',
            description: 'Your Full Name',
            items: [
              {
                name: 'firstName',
                type: 'text',
                title: 'First Name',
              },
              {
                name: 'lastName',
                type: 'text',
                title: 'Last Name',
              },
              {
                name: 'gender',
                type: 'radiogroup',
                title: 'Gender',
                items: [
                  {
                    type: 'radioItem',
                    name: 'male',
                    title: 'Male',
                  },
                  { type: 'radioItem', name: 'female', title: 'Female' },
                ],
              },
            ],
          },
          {
            name: 'contactDetails',
            type: 'grid',
            title: 'Contact Details',
            description: 'Your Contact Details',
            collapsible: true,
            columns: 2,
            items: [
              {
                name: 'email',
                type: 'email',
                title: 'Email',
              },
              {
                name: 'telephone',
                type: 'telephone',
                title: 'Telephone',
              },
            ],
          },
          {
            name: 'dateOfBirth',
            type: 'date',
            title: 'Date of Birth',
          },
        ],
      },
      {
        name: 'productDelivery',
        type: 'form',
        title: 'Product Delivery Form',
        description: 'Please provide the delivery details for the product',
        items: [
          {
            name: 'deliveryDetails',
            type: 'group',
            title: 'Delivery Details',
            items: [
              {
                name: 'deliveryAddress',
                type: 'text',
                title: 'Delivery Address',
              },
              {
                name: 'city',
                type: 'text',
                title: 'City',
              },
              {
                name: 'zipCode',
                type: 'text',
                title: 'Zip Code',
              },
            ],
          },
          {
            name: 'deliveryPreferences',
            type: 'grid',
            title: 'Preferred Delivery Time',
            description: 'When do you prefer the product to be delivered?',
            columns: 2,
            items: [
              {
                name: 'deliveryDate',
                type: 'date',
                title: 'Date',
              },
              {
                name: 'deliveryTime',
                type: 'time',
                title: 'Time',
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
