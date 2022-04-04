const addUserSchema = {
  type: 'object',
  properties: {
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
    gender: {
      type: 'string',
      enum: ['Male', 'Female', 'Other'],
    },
    skills: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          proficiency: {
            type: 'string',
            enum: ['Beginer', 'Intermediate', 'Advanced'],
          },
        },
      },
    },
  },
  required: [
    'firstName',
    'lastName',
    'gender',
  ],
  additionalProperties: false,
};

export {
  addUserSchema,
};
